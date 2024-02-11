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
import { DefaultUserFacingError } from "../../../config/messages";
import {
  UserFacingAsyncFunction,
  ErrorDisplayer,
  LoadingDisplayer,
} from "../../../helpers/types";

export function handleErrorDetected_Internals(
  id: string,
  error: unknown,
  registeredFunctions: Record<string, UserFacingAsyncFunction<any>>,
  findErrorDisplayers: (id: string, error: unknown) => ErrorDisplayer[],
  findLoadingDisplayer: (id: string) => LoadingDisplayer
) {
  const f = registeredFunctions[id];
  if (!f) {
    throw new Error(
      `Could not find a registered async function with the given identifier ${id}. Ensure you wait for all function executions to complete before removing a registered async function.`
    );
  }
  const ds = findErrorDisplayers(id, error);
  ds.forEach((d) => {
    const definedError = f.config.definedErrors?.find((f) => f(error));
    if (definedError) {
      d.onErrorDetected(definedError(error)!);
    } else {
      d.onErrorDetected(f.config.defaultError || DefaultUserFacingError);
    }
  });
  const ld = findLoadingDisplayer(id);
  ld.onErrorDetected();
}
