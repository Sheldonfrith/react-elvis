import { ElvisDisplayConfig } from "../helpers/types";
export declare function useRegisterAsyncFunctionAbortable<ArgsType extends any[], ReturnType>(identifier: string, f_unwrapped: (abortController: AbortController, ...args: ArgsType) => Promise<ReturnType>, config: ElvisDisplayConfig, registerFunction: (identifier: string, f: (abortController: AbortController, ...args: ArgsType) => Promise<ReturnType>, config: ElvisDisplayConfig) => (...args: ArgsType) => Promise<ReturnType>): ((...args: ArgsType) => Promise<ReturnType>) | undefined;
