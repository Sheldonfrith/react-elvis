export declare function useElvis(): {
    async: {
        wrappedFunctions: Record<string, (...args: any[]) => Promise<any>>;
        register: <ArgsType extends any[], ReturnType_1>(identifier: string, f: (...args: ArgsType) => Promise<ReturnType_1>, config: import("../helpers/types").ElvisDisplayConfig) => ((...args: ArgsType) => Promise<ReturnType_1>) | undefined;
        abortable: {
            register: <ArgsType_1 extends any[], ReturnType_2>(identifier: string, f: (abortController: AbortController, ...args: ArgsType_1) => Promise<ReturnType_2>, config: import("../helpers/types").ElvisDisplayConfig) => ((...args: ArgsType_1) => Promise<ReturnType_2>) | undefined;
            getAbortController: (identifier: string) => AbortController | undefined;
        };
    };
    display: {
        error: {
            handle: (identifier: string) => {
                error: import("../helpers/types").UserFacingError | undefined;
                clearError: () => void;
                residualError: import("../helpers/types").UserFacingError | undefined;
            };
            default: () => {
                error: import("../helpers/types").UserFacingError | undefined;
                clearError: () => void;
                residualError: import("../helpers/types").UserFacingError | undefined;
            };
        };
        loading: {
            handle: (identifier: string, durationOfCancelledState: number, durationOfSuccessState: number) => {
                loading: import("../helpers/types").UserFacingLoading | undefined;
                cancelled: import("../helpers/types").UserFacingCancelled | undefined;
                success: import("../helpers/types").UserFacingSuccess | undefined;
            };
            default: (durationOfCancelledState: number, durationOfSuccessState: number) => {
                loading: import("../helpers/types").UserFacingLoading | undefined;
                cancelled: import("../helpers/types").UserFacingCancelled | undefined;
                success: import("../helpers/types").UserFacingSuccess | undefined;
                abortController: AbortController | undefined;
            };
        };
    };
};
