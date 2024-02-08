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
import { useState, useEffect, useContext } from "react";
import { UserFacingError } from "../config/types";
import { ElvisContext } from "../components/contexts/ElvisContext";

export function useErrorDisplaySetup(
  type: "default" | "standard",
  identifier: string
) {
  const [errorState, setErrorState] = useState<UserFacingError>();
  // this captures the current or previous error state, and is erased as soon as the same function is called again
  const [residualErrorState, setResidualErrorState] =
    useState<UserFacingError>();
  // will still be available after clearing the error state
  useEffect(() => {
    if (errorState) {
      setResidualErrorState(errorState);
    }
  }, [errorState]);

  const context = useContext(ElvisContext);
  useEffect(() => {
    if (!context.registerErrorDisplayer) {
      throw new Error("ElvisContext not loaded");
    }
    const registerFunction =
      type === "default"
        ? context.registerDefaultErrorDisplayer
        : context.registerErrorDisplayer;
    registerFunction({
      identifier: identifier,
      onErrorDetected: (error: UserFacingError) => {
        setErrorState(error);
      },
      onNewFunctionCall: () => {
        setResidualErrorState(undefined);
      },
    });
  }, []);
  return {
    error: errorState,
    clearError: () => setErrorState(undefined),
    residualError: residualErrorState,
  };
}