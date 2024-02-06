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
  errorDetected_Internals,
  findErrorDisplayers_Internals,
} from "./helpers";
import { assert } from "../../helpers/myAssert";
import {
  ElvisConfig,
  ErrorDisplayer,
  LoadingDisplayer,
  UserFacingAsyncFunction,
} from "../../config/types";
import {
  DefaultUserFacingLoading,
  DefaultUserFacingCancelled,
  DefaultUserFacingSuccess,
  unhandledPromiseRejectionError,
} from "../../config/messages";

//initialize state structure here
export const ElvisContext = React.createContext({
  wrapAsyncFunction: <ArgsType extends any[]>(
    query: UserFacingAsyncFunction<any>,
    args: ArgsType
  ): Promise<any> => {
    return new Promise<any>(() => {});
  },
  wrapAsyncFunction_Abortable: <ArgsType extends any[]>(
    query: UserFacingAsyncFunction<any>,
    args: ArgsType
  ): Promise<any> => {
    return new Promise<any>(() => {});
  },
  registerLoadingDisplayer: (c: LoadingDisplayer) => {},
  registerErrorDisplayer: (c: ErrorDisplayer) => {},
  registerDefaultLoadingDisplayer: (c: LoadingDisplayer) => {},
  registerDefaultErrorDisplayer: (c: ErrorDisplayer) => {},
});

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
    { query: UserFacingAsyncFunction<any>; error: unknown }[]
  >([]);

  //! DISPLAYER FINDERS //
  const findLoadingDisplayer = useCallback(
    (query: UserFacingAsyncFunction<any>) => {
      const displayer = loadingDisplayers.find(
        (d) => d.identifier === query.identifier
      );
      const d = displayer || defaultLoadingDisplayer;
      assert(d, `No default Loading Displayer found.`);
      return d;
    },
    [loadingDisplayers, defaultLoadingDisplayer]
  );
  const findErrorDisplayers = useCallback(
    (query: UserFacingAsyncFunction<any>, error: unknown) => {
      return findErrorDisplayers_Internals(
        errorDisplayers,
        defaultErrorDisplayer,
        query,
        error
      );
    },
    [errorDisplayers, defaultErrorDisplayer]
  );
  const findAllErrorDisplayers = useCallback(
    (query: UserFacingAsyncFunction<any>) => {
      const displayers = errorDisplayers.filter(
        (d) => d.identifier === query.identifier
      );
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
  const loadingStart = useCallback(
    (query: UserFacingAsyncFunction<any>) => {
      console.log("loadingStart", query.identifier);
      const d = findLoadingDisplayer(query);
      d.onLoadingStart(
        query.config.loading || DefaultUserFacingLoading,
        query.abortController
      );
      // error displayer
      const errorDisplayers = findAllErrorDisplayers(query);
      errorDisplayers.forEach((d) => {
        d.onNewFunctionCall();
      });
    },
    [findAllErrorDisplayers, findLoadingDisplayer]
  );
  const loadingCancel = useCallback(
    (query: UserFacingAsyncFunction<any>) => {
      console.log("loadingCancel", query.identifier);
      const d = findLoadingDisplayer(query);
      d.onLoadingCancel(query.config.cancelled || DefaultUserFacingCancelled);
    },
    [findLoadingDisplayer]
  );
  const loadingEnd = useCallback(
    (query: UserFacingAsyncFunction<any>) => {
      console.log("loadingEnd", query.identifier);
      const d = findLoadingDisplayer(query);
      d.onLoadingEnd(query.config.success || DefaultUserFacingSuccess);
    },
    [findLoadingDisplayer]
  );
  const errorDetected = useCallback(
    (query: UserFacingAsyncFunction<any>, error: unknown) => {
      errorDetected_Internals(
        query,
        error,
        findErrorDisplayers,
        findLoadingDisplayer
      );
    },
    [findLoadingDisplayer, findErrorDisplayers]
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

  //!UNHANDLED PROMISE REJECTION HANDLER//
  // filter for when the user's code is bad
  useEffect(() => {
    const unhandledRejectionHandler = (event: any) => {
      setPendingUncatchableErrors((prev) => {
        return [
          ...prev,
          {
            query: {
              identifier: "unhandledrejection",
              callback: async () => {},
              config: unhandledPromiseRejectionError,
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
      console.log("handling uncatchable error", pendingUncatchableErrors);
      const error = pendingUncatchableErrors[0];
      errorDetected(error.query, error.error);
      setPendingUncatchableErrors((prev) => {
        return prev.slice(1);
      });
    }
  }, [pendingUncatchableErrors, errorDetected]);

  //! CORE FUNCTIONALITY //
  const runAsyncFunctionWithEventHandlers = useCallback(
    async <ArgsType extends any[]>(
      query: UserFacingAsyncFunction<any>,
      args: ArgsType
    ) => {
      console.log("runAsyncFunctionWithEventHandlers", query.identifier);
      try {
        // Set loading to true while the request is in progress
        loadingStart(query);
        const result = await query.callback(...args);
        loadingEnd(query);
        console.log("SUCCESSFULLY RAN THE CALLBACK");
        return result;
      } catch (error) {
        console.log("caught error in runAsyncFunctionWithEventHandlers", error);
        loadingEnd(query);
        errorDetected(query, error);
      }
    },
    [loadingStart, loadingEnd, errorDetected]
  );

  //! USER FACING FUNCTIONS //
  function wrapAsyncFunction<ArgsType extends any[]>(
    query: UserFacingAsyncFunction<any>,
    args: ArgsType
  ) {
    return runAsyncFunctionWithEventHandlers(query, args);
  }
  function wrapAsyncFunction_Abortable<ArgsType extends any[]>(
    query: UserFacingAsyncFunction<any>,
    args: ArgsType
  ) {
    if (query.abortController?.signal.aborted) {
      throw new Error(
        "You are probably cancelling and retrying too fast. Your abort signal is already aborted, possibly from a previous cancellation that hasnt reset yet."
      );
    }
    console.log("registering async function");
    function abortEventListener() {
      loadingCancel(query);
    }
    query.abortController?.signal.addEventListener(
      "abort",
      abortEventListener,
      {
        once: true,
      }
    );
    return runAsyncFunctionWithEventHandlers(query, [
      query.abortController,
      ...args,
    ]);
  }

  function registerLoadingDisplayer(c: LoadingDisplayer) {
    setLoadingDisplayers((prev) => {
      return [...prev, { ...c }];
    });
  }
  function registerErrorDisplayer(c: ErrorDisplayer) {
    setErrorDisplayers((prev) => {
      return [...prev, { ...c }];
    });
  }

  function registerDefaultErrorDisplayer(c: ErrorDisplayer) {
    setDefaultErrorDisplayer({ ...c });
  }

  function registerDefaultLoadingDisplayer(c: LoadingDisplayer) {
    setDefaultLoadingDisplayer({ ...c });
  }
  return (
    <ElvisContext.Provider
      value={{
        wrapAsyncFunction,
        wrapAsyncFunction_Abortable,
        registerLoadingDisplayer,
        registerErrorDisplayer,
        registerDefaultLoadingDisplayer,
        registerDefaultErrorDisplayer,
      }}
    >
      {children}
    </ElvisContext.Provider>
  );
};
