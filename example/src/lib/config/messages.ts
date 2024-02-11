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
import {
  ElvisDisplayConfig,
  UserFacingCancelled,
  UserFacingError,
  UserFacingLoading,
  UserFacingSuccess,
} from "./types";

export const customFunctionConfig: ElvisDisplayConfig = {
  defaultError: {
    title: "Unknown Error With Test Function",
    message: "An unknown error occurred with the test function.",
    canIgnore: false,
  },
  loading: {
    title: "Running Test Function",
    message: "The test function is running.",
  },
  definedErrors: [
    //where message is json
    (error: unknown) => {
      try {
        const parsed = JSON.parse((error as Error).message);
        if (parsed && typeof parsed === "object") {
          if (parsed["timeToComplete"]) {
            return {
              title: "Error in 'Delay'",
              message: parsed["timeToComplete"],
              canIgnore: true,
              optionalMetadata: { inputField: "timeToComplete" },
            };
          }
          if (parsed["completionType"]) {
            return {
              title: "Error in 'Result Type'",
              message: parsed["completionType"],
              canIgnore: true,
              optionalMetadata: { inputField: "completionType" },
            };
          }
        }
      } catch (e) {
        return undefined;
      }
    },
    // where it is our intentional error
    (error: unknown) => {
      if (error instanceof Error) {
        if (error.message === "This is an example error") {
          return {
            title: "Intentional Error",
            message:
              "This is the error you chose to throw, for testing purposes.",
            canIgnore: true,
          };
        }
      }
    },
  ],
};

export const unhandledPromiseRejectionError: ElvisDisplayConfig = {
  defaultError: {
    title: "Unhandled Promise Rejection Error",
    message:
      "React-Eals automatic error handling cannot properly handle 'unhandled promise rejections'. You need to ensure that every promise in your code catches all internal errors and 'rejects' with them.",
    canIgnore: false,
  },
};

export const DefaultUserFacingError: UserFacingError = {
  title: "Unidentified Error",
  message:
    "An unidentified error occurred. Restarting the application may resolve the issue. If the problem persists, please contact support.",
  canIgnore: false,
};

export const DefaultUserFacingLoading: UserFacingLoading = {
  title: "Loading",
  message: "Please wait.",
};

export const DefaultUserFacingSuccess: UserFacingSuccess = {
  title: "Success",
  message: "The operation was successful. 👍",
};
export const DefaultUserFacingCancelled: UserFacingCancelled = {
  title: "Cancelled",
  message: "The operation was cancelled. ❌",
};
