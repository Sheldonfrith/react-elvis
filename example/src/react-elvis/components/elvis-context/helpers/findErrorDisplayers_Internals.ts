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
import { assert } from "../../../helpers/myAssert";
import {
  ErrorDisplayer,
  UserFacingAsyncFunction,
} from "../../../helpers/types";

export function findErrorDisplayers_Internals(
  errorDisplayers: ErrorDisplayer[],
  defaultErrorDisplayer: ErrorDisplayer | undefined,
  identifier: string,
  error: unknown
) {
  const displayers = errorDisplayers.filter((d) => d.id === identifier);
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
