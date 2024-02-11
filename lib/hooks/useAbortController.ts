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

import { useCallback, useState } from "react";

export function useAbortController() {
  const [controller, setController] = useState<AbortController>(() => {
    const c = new AbortController();
    c.signal.onabort = () => {
      resetAbortController();
    };
    return c;
  });
  const resetAbortController = useCallback(() => {
    const newController = new AbortController();
    newController.signal.onabort = () => {
      resetAbortController();
    };
    setController(newController);
  }, [setController]);

  return controller;
}

export function resetableAbortController(
  resetAbortControllerCallback: (fresh: AbortController) => void,
  onabort: (e: Event) => void
): AbortController {
  const n = new AbortController();
  n.signal.onabort = (e: Event) => {
    const fresh = resetableAbortController(
      resetAbortControllerCallback,
      onabort
    );
    resetAbortControllerCallback(fresh);
    onabort(e);
  };
  return n;
}
