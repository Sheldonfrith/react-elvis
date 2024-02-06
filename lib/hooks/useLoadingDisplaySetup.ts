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
import { useState, useEffect, useContext, useCallback } from "react";
import { ElvisContext } from "../components/contexts/ElvisContext";
import {
  UserFacingLoading,
  UserFacingCancelled,
  UserFacingSuccess,
} from "../config/types";

export function useLoadingDisplaySetup(
  type: "default" | "standard",
  identifier: string,
  durationOfCancelledState: number,
  durationOfSuccessState: number,
  additionalEffects?: {
    onLoadingStart: (() => void)[];
    onLoadingEnd: (() => void)[];
    onLoadingCancel: (() => void)[];
  }
) {
  const context = useContext(ElvisContext);
  const [loadingState, setLoadingState] = useState<UserFacingLoading>();
  const [abortController, setAbortController] = useState<AbortController>();
  const [cancelledState, setCancelledState] = useState<UserFacingCancelled>();
  const [successState, setSuccessState] = useState<UserFacingSuccess>();

  useEffect(() => {
    if (cancelledState) {
      setTimeout(() => {
        setCancelledState(undefined);
      }, durationOfCancelledState);
    }
  }, [cancelledState]);

  useEffect(() => {
    if (successState) {
      setTimeout(() => {
        setSuccessState(undefined);
      }, durationOfSuccessState);
    }
  }, [successState]);

  const onLoadingStart = useCallback(
    (loading: UserFacingLoading, abortController?: AbortController) => {
      console.log("on loading start");
      setLoadingState(loading);
      if (abortController) {
        setAbortController(abortController);
      }
      additionalEffects?.onLoadingStart.forEach((f) => f());
    },
    [setLoadingState, setAbortController]
  );
  const onLoadingEnd = useCallback(
    (success: UserFacingSuccess) => {
      setLoadingState(undefined);
      console.log("about to set success state");
      setSuccessState(success);
      additionalEffects?.onLoadingEnd.forEach((f) => f());
    },
    [setLoadingState, setSuccessState]
  );
  const onLoadingCancel = useCallback(
    (cancelled: UserFacingCancelled) => {
      setLoadingState(undefined);
      setCancelledState(cancelled);
      additionalEffects?.onLoadingCancel.forEach((f) => f());
    },
    [setLoadingState, setCancelledState]
  );
  const onErrorDetected = useCallback(() => {
    setCancelledState(undefined);
    setSuccessState(undefined);
  }, [setCancelledState, setSuccessState]);

  useEffect(() => {
    if (!context.registerLoadingDisplayer) {
      throw new Error("ElvisContext not loaded");
    }
    const registerFunction =
      type === "default"
        ? context.registerDefaultLoadingDisplayer
        : context.registerLoadingDisplayer;
    registerFunction({
      identifier: identifier,
      onLoadingStart,
      onLoadingEnd,
      onLoadingCancel,
      onErrorDetected,
    });
  }, []);
  return {
    loading: loadingState,
    cancelled: cancelledState,
    success: successState,
    abortController,
  };
}
