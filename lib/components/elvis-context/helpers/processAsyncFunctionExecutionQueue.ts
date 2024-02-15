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
import {
  FunctionExecutionRequest,
  UserFacingAsyncFunction,
} from "../../../helpers/types";

export async function processAsyncFunctionExecutionRequest(
  executionRequest: FunctionExecutionRequest,
  registeredFunctions: Record<string, UserFacingAsyncFunction<any>>,
  functionWrapper: (f: UserFacingAsyncFunction, args: any) => Promise<any>
) {
  const maxWaitTime = 2000;
  // whenever a new execution request is added, or whenever a function changes
  const now = Date.now();
  const howOld = now - executionRequest.calledAt;
  if (howOld > maxWaitTime) {
    executionRequest.reject(
      new Error(
        `We were unable to execute the function in time. Function: ${executionRequest.id}. Args: ${executionRequest.args} `
      )
    );
    return;
  }
  const match = registeredFunctions[executionRequest.id];
  if (!match) {
    executionRequest.reject(
      new Error(
        `We were unable to find a registered function with the id: ${executionRequest.id}`
      )
    );
  } else {
    // if the current function is the same age or newer than our timestamp then we can run it
    if (match.versionTimestamp >= executionRequest.versionTimestamp) {
      try {
        executionRequest.resolve(
          await functionWrapper(match, executionRequest.args)
        );
      } catch (e) {
        executionRequest.reject(e);
      }
    }
  }
}

export async function processQueue(
  queue: FunctionExecutionRequest[],
  registeredFunctions: Record<string, UserFacingAsyncFunction<any>>,
  functionWrapper: (f: UserFacingAsyncFunction, args: any) => Promise<any>,
  setQueue: (queue: FunctionExecutionRequest[]) => void
) {
  if (queue.length > 0) {
    // Execute the first item in the queue
    const [currentItem, ...remainingItems] = queue;
    setQueue(remainingItems);

    // Process the rest of the queue after the current item
    await processQueue(
      remainingItems,
      registeredFunctions,
      functionWrapper,
      setQueue
    );

    // Execute the current item
    await processAsyncFunctionExecutionRequest(
      currentItem,
      registeredFunctions,
      functionWrapper
    );
  }
}
