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
import {
  UserFacingLoading,
  UserFacingCancelled,
  UserFacingSuccess,
  LoadingDisplayer,
} from "../helpers/types";
import { ElvisContext } from "../components/elvis-context/ElvisContext";

export function useLoadingDisplaySetup(
  identifier: string,
  registerFunction: (c: LoadingDisplayer) => void,
  durationOfCancelledState: number,
  durationOfSuccessState: number
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
      setLoadingState(loading);
      if (abortController) {
        setAbortController(abortController);
      }
    },
    [setLoadingState, setAbortController]
  );
  const onLoadingEnd = useCallback(
    (success: UserFacingSuccess) => {
      setLoadingState(undefined);
      setSuccessState(success);
    },
    [setLoadingState, setSuccessState]
  );
  const onLoadingCancel = useCallback(
    (cancelled: UserFacingCancelled) => {
      console.log("in onLoadingCancel", cancelled);
      setLoadingState(undefined);
      setCancelledState(cancelled);
    },
    [setLoadingState, setCancelledState]
  );
  const onErrorDetected = useCallback(() => {
    setCancelledState(undefined);
    setSuccessState(undefined);
  }, [setCancelledState, setSuccessState]);

  useEffect(() => {
    registerFunction({
      id: identifier,
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
