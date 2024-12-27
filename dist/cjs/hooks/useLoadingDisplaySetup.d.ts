import { UserFacingLoading, UserFacingCancelled, UserFacingSuccess, LoadingDisplayer } from "../helpers/types";
export declare function useLoadingDisplaySetup(identifier: string, registerFunction: (c: LoadingDisplayer) => void, durationOfCancelledState: number, durationOfSuccessState: number): {
    loading: UserFacingLoading | undefined;
    cancelled: UserFacingCancelled | undefined;
    success: UserFacingSuccess | undefined;
    abortController: AbortController | undefined;
};
