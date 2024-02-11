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
export type ElvisConfig = {
  graceTimeToDetectDefaultDisplayers?: number; //1000
  // in milliseconds, use if your default display component might take longer than usual to render

  disableDefaultErrorDisplayerCheck?: boolean; // false
  disableDefaultLoadingDisplayerCheck?: boolean; // false
  // not recommended, React-Elvis will throw errors if it cannot find a way to display a loading or error state
};

export type UserFacingError = {
  title: string;
  message: string;
  canIgnore: boolean;
  optionalMetadata?: Record<string, unknown>;
};
export type UserFacingLoading = {
  title: string;
  message: string;
  abortController?: AbortController;
};
export type UserFacingSuccess = {
  title: string;
  message: string;
};
export type UserFacingCancelled = {
  title: string;
  message: string;
};
export type UserFacingErrorFilter = (
  error: unknown
) => UserFacingError | undefined;

export type LoadingDisplayer = {
  id: string;
  onLoadingStart: (
    loading: UserFacingLoading,
    abortController?: AbortController
  ) => void;
  onLoadingCancel: (cancelled: UserFacingCancelled) => void;
  onLoadingEnd: (success: UserFacingSuccess) => void;
  onErrorDetected: () => void;
};

export type ErrorDisplayer = {
  id: string;
  onErrorDetected: (error: UserFacingError) => void;
  onNewFunctionCall: () => void;
  onlyTheseErrors?: ((error: unknown) => boolean)[];
};

export type ElvisDisplayConfig = {
  defaultError?: UserFacingError;
  loading?: UserFacingLoading;
  success?: UserFacingSuccess;
  cancelled?: UserFacingCancelled;
  definedErrors?: UserFacingErrorFilter[];
};

export type UserFacingAsyncFunction<
  ArgsType extends any[] = any,
  ReturnType = any
> = {
  id: string;
  versionTimestamp: number;
  callback: (...args: ArgsType) => Promise<ReturnType>;
  config: ElvisDisplayConfig;
  abortable: "abortable" | "not-abortable";
};

export type FunctionExecutionRequest = {
  calledAt: number;
  id: string;
  versionTimestamp: number;
  args: any[];
  resolve: (value: unknown) => void;
  reject: (reason: any) => void;
};
