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

import { DefaultUserFacingError } from "../../config/messages";
import {
  ErrorDisplayer,
  UserFacingAsyncFunction,
  LoadingDisplayer,
} from "../../config/types";
import { assert } from "../../helpers/myAssert";

export function findErrorDisplayers_Internals(
  errorDisplayers: ErrorDisplayer[],
  defaultErrorDisplayer: ErrorDisplayer | undefined,
  query: UserFacingAsyncFunction<any>,
  error: unknown
) {
  const displayers = errorDisplayers.filter(
    (d) => d.identifier === query.identifier
  );
  const displayersApplicable = displayers.filter((d) => {
    return !d.onlyTheseErrors || d.onlyTheseErrors.some((f) => f(error));
  });
  if (displayersApplicable.length > 0) {
    return displayersApplicable;
  }
  const d = defaultErrorDisplayer;
  assert(d, `No default Error Displayer found.`);
  return [d];
}

export function errorDetected_Internals(
  query: UserFacingAsyncFunction<any>,
  error: unknown,
  findErrorDisplayers: (
    query: UserFacingAsyncFunction<any>,
    error: unknown
  ) => ErrorDisplayer[],
  findLoadingDisplayer: (
    query: UserFacingAsyncFunction<any>
  ) => LoadingDisplayer
) {
  const ds = findErrorDisplayers(query, error);
  ds.forEach((d) => {
    const definedError = query.config.definedErrors?.find((f) => f(error));
    if (definedError) {
      d.onErrorDetected(definedError(error)!);
    } else {
      d.onErrorDetected(query.config.defaultError || DefaultUserFacingError);
    }
  });
  const ld = findLoadingDisplayer(query);
  ld.onErrorDetected();
}
