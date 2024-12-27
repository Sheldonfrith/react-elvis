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
import { ElvisDisplayConfig, UserFacingError, UserFacingLoading, UserFacingCancelled, UserFacingSuccess } from "../../helpers/types";
export declare const ElvisContext: React.Context<{
    async: {
        wrappedFunctions: Record<string, (...args: any[]) => Promise<any>>;
        register: <ArgsType extends any[], ReturnType_1>(identifier: string, f: (...args: ArgsType) => Promise<ReturnType_1>, config: ElvisDisplayConfig) => ((...args: ArgsType) => Promise<ReturnType_1>) | undefined;
        abortable: {
            register: <ArgsType_1 extends any[], ReturnType_2>(identifier: string, f: (abortController: AbortController, ...args: ArgsType_1) => Promise<ReturnType_2>, config: ElvisDisplayConfig) => ((...args: ArgsType_1) => Promise<ReturnType_2>) | undefined;
            getAbortController: (identifier: string) => AbortController | undefined;
        };
    };
    display: {
        error: {
            handle: (identifier: string) => {
                error: UserFacingError | undefined;
                clearError: () => void;
                residualError: UserFacingError | undefined;
            };
            default: () => {
                error: UserFacingError | undefined;
                clearError: () => void;
                residualError: UserFacingError | undefined;
            };
        };
        loading: {
            handle: (identifier: string, durationOfCancelledState: number, durationOfSuccessState: number) => {
                loading: UserFacingLoading | undefined;
                cancelled: UserFacingCancelled | undefined;
                success: UserFacingSuccess | undefined;
            };
            default: (durationOfCancelledState: number, durationOfSuccessState: number) => {
                loading: UserFacingLoading | undefined;
                cancelled: UserFacingCancelled | undefined;
                success: UserFacingSuccess | undefined;
                abortController: AbortController | undefined;
            };
        };
    };
}>;
