import { ElvisDisplayConfig } from "../config/types";
export declare function useWrap<T extends any[]>(name: string, callback: (...args: T) => Promise<any>, config: ElvisDisplayConfig): (...args: Parameters<typeof callback>) => Promise<any>;
