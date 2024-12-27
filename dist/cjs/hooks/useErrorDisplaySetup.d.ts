import { ErrorDisplayer, UserFacingError } from "../helpers/types";
export declare function useErrorDisplaySetup(identifier: string, registerFunction: (c: ErrorDisplayer) => void): {
    error: UserFacingError | undefined;
    clearError: () => void;
    residualError: UserFacingError | undefined;
};
