export declare function useHandleErrorDisplay(identifier: string): {
    error: import("../config/types").UserFacingError | undefined;
    clearError: () => void;
    residualError: import("../config/types").UserFacingError | undefined;
};
