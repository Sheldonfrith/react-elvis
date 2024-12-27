import { ElvisDisplayConfig } from "../config/types";
export declare function useWrap_Abortable<T extends any[]>(name: string, callback: (controller: AbortController, ...args: T) => Promise<any>, config: ElvisDisplayConfig): {
    f: (...args: T) => Promise<any>;
    abortController: AbortController;
};
