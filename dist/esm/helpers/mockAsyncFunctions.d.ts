export declare function customMockRequest(abortController: AbortController, formValues: EventTarget): Promise<unknown>;
export declare function validateMockRequestInput(formValues: EventTarget): {
    timeToComplete: number;
    completionType: "success" | "incorrectly-thrown-error" | "correctly-thrown-error" | "self-cancel";
};
