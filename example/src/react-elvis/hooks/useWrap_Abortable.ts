/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
import { useContext, useCallback } from "react";
import { useAbortController } from "./useAbortController";
import { ElvisContext } from "../components/contexts/ElvisContext";
import { ElvisDisplayConfig } from "../config/types";

export function useWrap_Abortable<T extends any[]>(
  name: string,
  callback: (controller: AbortController, ...args: T) => Promise<any>,
  config: ElvisDisplayConfig
) {
  const abortController = useAbortController();
  const context = useContext(ElvisContext);
  return {
    f: async (...args: T) => {
      const r = await context.wrapAsyncFunction_Abortable(
        { identifier: name, callback, config, abortController },
        args
      );
      return r;
    },
    abortController,
  };
}

//! OLD VERSION, FOR REFERENCE
// export function useWrap_Abortable<T extends any[]>(
//   name: string,
//   callback: (controller: AbortController, ...args: T) => Promise<any>,
//   config: ElvisDisplayConfig
// ) {
//   const abortController = useAbortController();
//   const context = useContext(ElvisContext);
//   return {
//     f: useCallback(
//       async (...args: T) => {
//         const r = await context.wrapAsyncFunction_Abortable(
//           { identifier: name, callback, config, abortController },
//           args
//         );
//         return r;
//       },
//       [context, abortController]
//     ),
//     abortController,
//   };
// }

// export const useDELETE_ME_useWrapTest = useCallback(
//   <T extends any[]>(
//     callback: (controller: AbortController, ...args: T) => Promise<any>
//   ) => {
//     const abortController = useAbortController();
//     const context = useContext(ElvisContext);
//     return useCallback(
//       async (...args: T) => {
//         return callback(abortController, ...args);
//       },
//       [context, abortController]
//     );
//   },
//   []
// );