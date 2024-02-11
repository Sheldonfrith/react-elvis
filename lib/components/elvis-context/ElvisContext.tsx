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
import React from "react";
import {
  ElvisDisplayConfig,
  UserFacingError,
  UserFacingLoading,
  UserFacingCancelled,
  UserFacingSuccess,
} from "../../helpers/types";

export const ElvisContext = React.createContext({
  async: {
    register: <ArgsType extends any[], ReturnType>(
      identifier: string,
      f: (...args: ArgsType) => Promise<ReturnType>,
      config: ElvisDisplayConfig
    ): ((...args: ArgsType) => Promise<ReturnType>) => {
      return (...args: any[]) => new Promise((resolve, reject) => {});
    },
    abortable: {
      register: <ArgsType extends any[], ReturnType>(
        identifier: string,
        f: (
          abortController: AbortController,
          ...args: ArgsType
        ) => Promise<ReturnType>,
        config: ElvisDisplayConfig
      ): ((...args: ArgsType) => Promise<ReturnType>) => {
        return (...args: any[]) => new Promise((resolve, reject) => {});
      },

      getAbortController: (identifier: string) => {
        new AbortController();
      },
    },
  },
  display: {
    error: {
      handle: (
        identifier: string
      ): {
        error: UserFacingError | undefined;
        clearError: () => void;
        residualError: UserFacingError | undefined;
      } => ({
        error: undefined,
        clearError: () => {},
        residualError: undefined,
      }),
      default: (): {
        error: UserFacingError | undefined;
        clearError: () => void;
        residualError: UserFacingError | undefined;
      } => ({
        error: undefined,
        clearError: () => {},
        residualError: undefined,
      }),
    },
    loading: {
      handle: (
        identifier: string,
        durationOfCancelledState: number,
        durationOfSuccessState: number
      ): {
        loading: UserFacingLoading | undefined;
        cancelled: UserFacingCancelled | undefined;
        success: UserFacingSuccess | undefined;
        abortController: AbortController | undefined;
      } => {
        return {
          loading: undefined,
          cancelled: undefined,
          success: undefined,
          abortController: undefined,
        };
      },
      default: (
        durationOfCancelledState: number,
        durationOfSuccessState: number
      ): {
        loading: UserFacingLoading | undefined;
        cancelled: UserFacingCancelled | undefined;
        success: UserFacingSuccess | undefined;
        abortController: AbortController | undefined;
      } => {
        return {
          loading: undefined,
          cancelled: undefined,
          success: undefined,
          abortController: undefined,
        };
      },
    },
  },
});
