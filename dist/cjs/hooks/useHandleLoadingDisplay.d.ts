export declare function useHandleLoadingDisplay(identifier: string, durationOfCancelledState: number, durationOfSuccessState: number, additionalEffects?: {
    onLoadingStart: (() => void)[];
    onLoadingEnd: (() => void)[];
    onLoadingCancel: (() => void)[];
}): {
    loading: import("../config/types").UserFacingLoading | undefined;
    cancelled: import("../config/types").UserFacingCancelled | undefined;
    success: import("../config/types").UserFacingSuccess | undefined;
    abortController: AbortController | undefined;
};
