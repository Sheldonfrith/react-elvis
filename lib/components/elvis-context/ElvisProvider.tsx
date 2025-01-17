/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/

import React, {
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import {
  DefaultUserFacingLoading,
  DefaultUserFacingCancelled,
  DefaultUserFacingSuccess,
  unhandledPromiseRejectionError,
} from "../../config/messages";
import {
  ErrorDisplayer,
  UserFacingAsyncFunction,
  ElvisConfig,
  LoadingDisplayer,
  ElvisDisplayConfig,
  FunctionExecutionRequest,
} from "../../helpers/types";
import { assert } from "../../helpers/myAssert";

import { useErrorDisplaySetup } from "../../hooks/useErrorDisplaySetup";
import { useLoadingDisplaySetup } from "../../hooks/useLoadingDisplaySetup";
import { ElvisContext } from "./ElvisContext";
import { findErrorDisplayers_Internals } from "./helpers/findErrorDisplayers_Internals";
import { handleErrorDetected_Internals } from "./helpers/handleErrorDetected_Internals";
import { identicalAsyncFunctionRegistered } from "./helpers/identicalAsyncFunctionRegistered";
import { catchPromiseErrors } from "./helpers/catchPromiseErrors";
import { useRegisterAsyncFunction } from "../../hooks/useRegisterAsyncFunction";
import { useRegisterAsyncFunctionAbortable } from "../../hooks/useRegisterAsyncFunctionAbortable";
import { resetableAbortController } from "./helpers/resetableAbortController";
import {
  processAsyncFunctionExecutionRequest,
  processQueue,
} from "./helpers/processAsyncFunctionExecutionQueue";

export const ElvisProvider: React.FunctionComponent<
  PropsWithChildren<{ config?: ElvisConfig }>
> = ({ config: elvisConfig, children }) => {
  //! STATE VARIABLES //
  const [loadingDisplayers, setLoadingDisplayers] = useState<
    LoadingDisplayer[]
  >([]);
  const [errorDisplayers, setErrorDisplayers] = useState<ErrorDisplayer[]>([]);
  const [defaultLoadingDisplayer, setDefaultLoadingDisplayer] =
    useState<LoadingDisplayer>();
  const [defaultErrorDisplayer, setDefaultErrorDisplayer] =
    useState<ErrorDisplayer>();
  const [pendingUncatchableErrors, setPendingUncatchableErrors] = useState<
    { query: UserFacingAsyncFunction; error: unknown }[]
  >([]);
  const [registeredFunctions, setRegisteredFunctions] = useState<
    Record<string, UserFacingAsyncFunction>
  >({});
  const [abortControllers, setAbortControllers] = useState<
    Record<string, AbortController>
  >({});

  const [wrappedFunctions, setWrappedFunctions] = useState<
    Record<string, (...args: any[]) => Promise<any>>
  >({});
  const [asyncFunctionExecutionQueue, setAsyncFunctionExecutionQueue] =
    useState<FunctionExecutionRequest[]>([]);

  const [abortEventsQueue, setAbortEventsQueue] = useState<string[]>([]);

  //! DEBUGGING //
  useEffect(() => {
    console.log("asyncFunctionExecutionQueue", asyncFunctionExecutionQueue);
  }, [asyncFunctionExecutionQueue]);

  //!

  // ! HELPER TO SETUP ABORT CONTROLLER ON NEW REGISTER REQUEST //
  const setupAbortControllerForNewAsyncFunction = useCallback(
    (id: string) => {
      setAbortControllers((prev) => {
        if (id in prev && prev[id]) return prev;
        const c = resetableAbortController(
          (fresh: AbortController) =>
            setAbortControllers((prev) => {
              return { ...prev, [id]: fresh };
            }),
          (e: Event) => {
            setAbortEventsQueue((prev) => {
              return [...prev, id];
            });
          }
        );
        return { ...prev, [id]: c };
      });
    },
    [setAbortControllers]
  );
  useEffect(() => {
    if (!abortEventsQueue.length) return;
    setAbortEventsQueue((prev) => {
      const s = new Set(prev);
      s.forEach((id) => {
        handleLoadingCancel(id);
      });
      return [];
    });
  }, [abortEventsQueue]);

  //! Handling function executions //

  useEffect(() => {
    if (!asyncFunctionExecutionQueue.length) return;
    processQueue(
      asyncFunctionExecutionQueue,
      registeredFunctions,
      runAsyncFunctionWithEventHandlers,
      setAsyncFunctionExecutionQueue
    );
  }, [asyncFunctionExecutionQueue, registeredFunctions]);

  //! DISPLAYER FINDERS //
  const findLoadingDisplayer = useCallback(
    (id: string) => {
      const displayer = loadingDisplayers.find((d) => d.id === id);
      const d = displayer || defaultLoadingDisplayer;
      assert(
        d,
        `No default Loading Displayer found. ${id} and ${JSON.stringify(
          loadingDisplayers
        )}`
      );
      return d;
    },
    [loadingDisplayers, defaultLoadingDisplayer]
  );

  const findErrorDisplayers = useCallback(
    (id: string, error: unknown) => {
      return findErrorDisplayers_Internals(
        errorDisplayers,
        defaultErrorDisplayer,
        id,
        error
      );
    },
    [errorDisplayers, defaultErrorDisplayer]
  );
  const findAllErrorDisplayers = useCallback(
    (id: string) => {
      const displayers = errorDisplayers.filter((d) => d.id === id);
      if (displayers.length > 0) {
        return displayers;
      } else {
        if (defaultErrorDisplayer) {
          return [defaultErrorDisplayer];
        }
        throw new Error("No default Error Displayer found.");
      }
    },
    [errorDisplayers, defaultErrorDisplayer]
  );
  //! EVENT HANDLERS //
  const handleLoadingStart = useCallback(
    (id: string) => {
      const d = findLoadingDisplayer(id);
      const f = registeredFunctions[id];
      d.onLoadingStart(
        f?.config?.loading || DefaultUserFacingLoading,
        abortControllers[id]
      );
      // error displayer
      const errorDisplayers = findAllErrorDisplayers(id);
      errorDisplayers.forEach((d) => {
        d.onNewFunctionCall();
      });
    },
    [findAllErrorDisplayers, findLoadingDisplayer, registeredFunctions]
  );
  const handleLoadingCancel = useCallback(
    (id: string) => {
      const d = findLoadingDisplayer(id);
      const f = registeredFunctions[id];
      d.onLoadingCancel(f?.config?.cancelled || DefaultUserFacingCancelled);
    },
    [findLoadingDisplayer, registeredFunctions]
  );
  const handleLoadingEnd = useCallback(
    (id: string) => {
      const d = findLoadingDisplayer(id);
      const f = registeredFunctions[id];
      d.onLoadingEnd(f?.config?.success || DefaultUserFacingSuccess);
    },
    [findLoadingDisplayer, registeredFunctions]
  );
  const handleErrorDetected = useCallback(
    (id: string, error: unknown) => {
      handleErrorDetected_Internals(
        id,
        error,
        registeredFunctions,
        findErrorDisplayers,
        findLoadingDisplayer
      );
    },
    [findLoadingDisplayer, findErrorDisplayers, registeredFunctions]
  );
  //! DEFAULT DISPLAYERS CHECK //
  //wait for app to load, then check for default displayers
  useEffect(() => {
    setTimeout(() => {
      setDefaultErrorDisplayer((prev) => {
        if (!prev && !elvisConfig?.disableDefaultErrorDisplayerCheck) {
          throw new Error(
            "No default error displayer found. Please register a default error displayer or disable the default displayer check using the config prop in the Eals Provider."
          );
        }
        return prev;
      });
      setDefaultLoadingDisplayer((prev) => {
        if (!prev && !elvisConfig?.disableDefaultLoadingDisplayerCheck) {
          throw new Error(
            "No default loading displayer found. Please register a default loading displayer or disable the default displayer check using the config prop in the Eals Provider."
          );
        }
        return prev;
      });
    }, elvisConfig?.graceTimeToDetectDefaultDisplayers || 1000);
  }, []);

  //! UNHANDLED PROMISE REJECTION HANDLER //
  // filter for when the user's code is missing promise rejection handlers
  useEffect(() => {
    registerUnabortable(
      "unhandledrejection",
      async () => {},
      unhandledPromiseRejectionError
    );
    const unhandledRejectionHandler = (event: any) => {
      setPendingUncatchableErrors((prev) => {
        return [
          ...prev,
          {
            query: {
              id: "unhandledrejection",
              versionTimestamp: -1, // does not matter is not used
              callback: async () => {}, // does not matter is not used
              config: unhandledPromiseRejectionError,
              abortable: "not-abortable", // does not matter is not used
            },
            error: event.reason,
          },
        ];
      });
    };
    window.addEventListener("unhandledrejection", unhandledRejectionHandler, {
      once: true,
    });
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionHandler
      );
    };
  }, []);

  // handle the uncatchable errors
  useEffect(() => {
    if (pendingUncatchableErrors.length > 0) {
      const error = pendingUncatchableErrors[0];
      handleErrorDetected(error.query.id, error.error);
      setPendingUncatchableErrors((prev) => {
        return prev.slice(1);
      });
    }
  }, [pendingUncatchableErrors, handleErrorDetected]);

  //! WRAPPERS - CORE FUNCTIONALITY //

  const createFunctionExecutionRequestAndGetPromise = useCallback(
    (id: string, versionTimestamp: number, newArgs: any[]) => {
      return new Promise<any>((resolve, reject) => {
        setAsyncFunctionExecutionQueue((prev) => {
          return [
            ...prev,
            {
              calledAt: Date.now(),
              id,
              versionTimestamp,
              args: newArgs,
              resolve,
              reject,
            },
          ];
        });
      });
    },
    []
  );

  const runAsyncFunctionWithEventHandlers = useCallback(
    async <ArgsType extends any[]>(
      f: UserFacingAsyncFunction,
      args: ArgsType
    ) => {
      try {
        // Set loading to true while the request is in progress
        handleLoadingStart(f.id);
        if (f.abortable === "abortable") {
          const abortController = abortControllers[f.id];
          assert(abortController, "No abort controller found for id " + f.id);
          const [result, error] = await catchPromiseErrors(
            // We handle passing in the abort controller for them, to make the final API cleaner
            f.callback(abortController, ...args)
          );
          if (error) {
            throw error;
          }
          handleLoadingEnd(f.id);
          return result;
        } else {
          const [result, error] = await catchPromiseErrors(f.callback(...args));
          if (error) {
            throw error;
          }
          handleLoadingEnd(f.id);
          return result;
        }
      } catch (error) {
        handleLoadingEnd(f.id);
        handleErrorDetected(f.id, error);
        console.error("Error handled by react-elvis", error);
      }
    },
    [
      handleLoadingStart,
      handleLoadingEnd,
      handleErrorDetected,
      abortControllers,
    ]
  );

  //! Display Registration Helpers ///
  function registerLoadingDisplayer(c: LoadingDisplayer) {
    setLoadingDisplayers((prev) => {
      return [...prev, { ...c }];
    });
  }

  function registerDefaultLoadingDisplayer(c: LoadingDisplayer) {
    setDefaultLoadingDisplayer({ ...c });
  }

  //! NEW FUNCTION REGISTRATION FUNCTIONS //

  const registerAbortable = useCallback(
    <ArgsType extends any[], ReturnType>(
      id: string,
      f: (
        abortController: AbortController,
        ...args: ArgsType
      ) => Promise<ReturnType>,
      config: ElvisDisplayConfig
    ): ((...args: ArgsType) => Promise<ReturnType>) => {
      const abortable = "abortable" as const;
      setRegisteredFunctions((prev) => {
        if (identicalAsyncFunctionRegistered(id, f, config, abortable, prev)) {
          return prev;
        }
        const timestamp = Date.now();
        const p = prev[id];
        const isNew = !p;
        const n = isNew
          ? {
              id,
              versionTimestamp: timestamp,
              callback: f,
              abortable,
              config,
            }
          : {
              ...p,
              versionTimestamp: timestamp,
              callback: f,
              abortable,
              config,
            };
        if (isNew && abortable === "abortable") {
          setupAbortControllerForNewAsyncFunction(id);
        }
        setWrappedFunctions((prev) => {
          return {
            ...prev,
            [id]: async (...args: any) => {
              return await createFunctionExecutionRequestAndGetPromise(
                id,
                timestamp,
                args
              );
            },
          };
        });
        return { ...prev, [id]: n };
      });
      return wrappedFunctions[id] as (...args: ArgsType) => Promise<ReturnType>;
    },
    [registeredFunctions, abortControllers, wrappedFunctions]
  );

  const registerUnabortable = useCallback(
    <ArgsType extends any[], ReturnType>(
      id: string,
      f: (...args: ArgsType) => Promise<ReturnType>,
      config: ElvisDisplayConfig
    ): ((...args: ArgsType) => Promise<ReturnType>) => {
      const abortable = "not-abortable" as const;
      setRegisteredFunctions((prev) => {
        if (identicalAsyncFunctionRegistered(id, f, config, abortable, prev)) {
          return prev;
        }
        const timestamp = Date.now();
        const p = prev[id];
        const isNew = !p;
        const n = isNew
          ? {
              id,
              versionTimestamp: timestamp,
              callback: f,
              abortable,
              config,
            }
          : {
              ...p,
              versionTimestamp: timestamp,
              callback: f,
              abortable,
              config,
            };
        setWrappedFunctions((prev) => {
          return {
            ...prev,
            [id]: async (...args: any) => {
              return await createFunctionExecutionRequestAndGetPromise(
                id,
                timestamp,
                args
              );
            },
          };
        });
        return { ...prev, [id]: n };
      });
      return wrappedFunctions[id] as (...args: ArgsType) => Promise<ReturnType>;
    },
    [registeredFunctions, abortControllers, wrappedFunctions]
  );

  //! USER FACING FUNCTIONS

  const ufRegisterAbortable = useCallback(
    <ArgsType extends any[], ReturnType>(
      identifier: string,
      f_unwrapped: (
        abortController: AbortController,
        ...args: ArgsType
      ) => Promise<ReturnType>,
      config: ElvisDisplayConfig
    ) => {
      return useRegisterAsyncFunctionAbortable(
        identifier,
        f_unwrapped,
        config,
        registerAbortable
      );
    },
    [registerAbortable]
  );
  const ufRegisterUnabortable = useCallback(
    <ArgsType extends any[], ReturnType>(
      identifier: string,
      f_unwrapped: (...args: ArgsType) => Promise<ReturnType>,
      config: ElvisDisplayConfig
    ) => {
      return useRegisterAsyncFunction(
        identifier,
        f_unwrapped,
        config,
        registerUnabortable
      );
    },
    [registerUnabortable]
  );

  const getAbortController = useCallback(
    (id: string) => {
      return abortControllers[id];
    },
    [abortControllers]
  );

  function displayErrorDefault() {
    return useErrorDisplaySetup("", (c: ErrorDisplayer) =>
      setDefaultErrorDisplayer({ ...c })
    );
  }
  function displayErrorHandle(id: string) {
    return useErrorDisplaySetup(id, (c: ErrorDisplayer) => {
      setErrorDisplayers((prev) => {
        return [...prev, { ...c }];
      });
    });
  }
  function displayLoadingDefault(
    durationOfCancelledState: number,
    durationOfSuccessState: number
  ) {
    return useLoadingDisplaySetup(
      "",
      registerDefaultLoadingDisplayer,
      durationOfCancelledState,
      durationOfSuccessState
    );
  }
  function displayLoadingHandle(
    id: string,
    durationOfCancelledState: number,
    durationOfSuccessState: number
  ) {
    return useLoadingDisplaySetup(
      id,
      registerLoadingDisplayer,
      durationOfCancelledState,
      durationOfSuccessState
    );
  }
  return (
    <ElvisContext.Provider
      value={{
        async: {
          wrappedFunctions: wrappedFunctions,
          register: ufRegisterUnabortable,
          abortable: {
            register: ufRegisterAbortable,
            getAbortController,
          },
        },
        display: {
          error: {
            handle: displayErrorHandle,
            default: displayErrorDefault,
          },
          loading: {
            handle: displayLoadingHandle,
            default: displayLoadingDefault,
          },
        },
      }}
    >
      {children}
    </ElvisContext.Provider>
  );
};
