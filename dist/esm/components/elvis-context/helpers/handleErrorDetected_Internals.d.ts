import { UserFacingAsyncFunction, ErrorDisplayer, LoadingDisplayer } from "../../../helpers/types";
export declare function handleErrorDetected_Internals(id: string, error: unknown, registeredFunctions: Record<string, UserFacingAsyncFunction<any>>, findErrorDisplayers: (id: string, error: unknown) => ErrorDisplayer[], findLoadingDisplayer: (id: string) => LoadingDisplayer): void;
