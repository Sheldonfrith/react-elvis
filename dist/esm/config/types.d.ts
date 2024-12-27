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
    graceTimeToDetectDefaultDisplayers?: number;
    disableDefaultErrorDisplayerCheck?: boolean;
    disableDefaultLoadingDisplayerCheck?: boolean;
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
export type UserFacingErrorFilter = (error: unknown) => UserFacingError | undefined;
export type LoadingDisplayer = {
    identifier: string;
    onLoadingStart: (loading: UserFacingLoading, abortController?: AbortController) => void;
    onLoadingCancel: (cancelled: UserFacingCancelled) => void;
    onLoadingEnd: (success: UserFacingSuccess) => void;
    onErrorDetected: () => void;
};
export type ErrorDisplayer = {
    identifier: string;
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
export type UserFacingAsyncFunction<ArgsType extends any[]> = {
    identifier: string;
    callback: (...args: ArgsType) => Promise<any>;
    config: ElvisDisplayConfig;
    abortController?: AbortController;
    resetAbortController?: () => void;
};
