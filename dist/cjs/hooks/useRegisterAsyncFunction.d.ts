import { ElvisDisplayConfig } from "../helpers/types";
export declare function useRegisterAsyncFunction<ArgsType extends any[], ReturnType>(identifier: string, f_unwrapped: (...args: ArgsType) => Promise<ReturnType>, config: ElvisDisplayConfig, registerFunction: (identifier: string, f: (...args: ArgsType) => Promise<ReturnType>, config: ElvisDisplayConfig) => (...args: ArgsType) => Promise<ReturnType>): ((...args: ArgsType) => Promise<ReturnType>) | undefined;