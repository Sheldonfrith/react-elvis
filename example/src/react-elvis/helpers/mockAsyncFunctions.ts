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
const incorrectlyReturnsAnErrorAfterASpecifiedAmountOfTime_Cancellable = async (
  signal: AbortController,
  seconds: number
) => {
  //! NOTE you have to "reject" with the error within a promise otherwise our wrapper cannot catch the error as it has already passed...
  return new Promise((resolve, reject) => {
    abortableTimeout(
      signal,
      async () => {
        throw new Error("This is an example error");
      },
      seconds * 1000,
      resolve
    );
  }).catch((e) => {
    throw e;
  });
};

const returnsAnErrorAfterASpecifiedAmountOfTime_Cancellable = async (
  signal: AbortController,
  seconds: number
) => {
  //! NOTE you have to "reject" with the error within a promise otherwise our wrapper cannot catch the error as it has already passed...
  return new Promise((resolve, reject) => {
    abortableTimeout(
      signal,
      async () => {
        reject(new Error("This is an example error"));
      },
      seconds * 1000,
      resolve
    );
  });
};

const returnsDataAfterASpecifiedAmountOfTime_Cancellable = async (
  signal: AbortController,
  seconds: number
) => {
  return new Promise((resolve, reject) => {
    abortableTimeout(
      signal,
      async () => {
        resolve({ exampleData: "This is an example data object" });
      },
      seconds * 1000,
      resolve
    );
  });
};
const cancelsItselfAfterASpecifiedAmountOfTime_Cancellable = async (
  abortController: AbortController,
  seconds: number
) => {
  console.log(
    "in cancelsItselfAfterASpecifiedAmountOfTime_Cancellable",
    abortController
  );
  return new Promise((resolve, reject) => {
    console.log("in promise", abortController.signal, abortController);
    abortableTimeout(
      abortController,
      async () => {
        abortController.abort();
      },
      seconds * 1000,
      resolve
    );
  });
};

export function customMockRequest(
  abortController: AbortController,
  formValues: EventTarget
) {
  // wait for the validation process to complete
  const { timeToComplete, completionType } =
    validateMockRequestInput(formValues);
  switch (completionType) {
    case "success":
      return returnsDataAfterASpecifiedAmountOfTime_Cancellable(
        abortController,
        timeToComplete
      );
    case "correctly-thrown-error":
      return returnsAnErrorAfterASpecifiedAmountOfTime_Cancellable(
        abortController,
        timeToComplete
      );
    case "incorrectly-thrown-error":
      return incorrectlyReturnsAnErrorAfterASpecifiedAmountOfTime_Cancellable(
        abortController,
        timeToComplete
      );
    case "self-cancel":
      return cancelsItselfAfterASpecifiedAmountOfTime_Cancellable(
        abortController,
        timeToComplete
      );
  }
}
export function validateMockRequestInput(formValues: EventTarget): {
  timeToComplete: number;
  completionType:
    | "success"
    | "incorrectly-thrown-error"
    | "correctly-thrown-error"
    | "self-cancel";
} {
  const timeToComplete = (formValues as any).timeToComplete.value;
  const completionType = (formValues as any).completionType.value;
  if (isNaN(Number(timeToComplete))) {
    throw new Error(
      JSON.stringify({ timeToComplete: "Please enter a valid number." })
    );
  }
  if (Number(timeToComplete) < 1) {
    throw new Error(
      JSON.stringify({
        timeToComplete: "Please enter a number greater than 0.",
      })
    );
  }
  if (Number(timeToComplete) > 60) {
    throw new Error(
      JSON.stringify({ timeToComplete: "Please enter a number less than 60." })
    );
  }
  if (
    completionType !== "success" &&
    completionType !== "incorrectly-thrown-error" &&
    completionType !== "correctly-thrown-error" &&
    completionType !== "self-cancel"
  ) {
    throw new Error(
      JSON.stringify({ completionType: "Please enter a valid result type." })
    );
  }
  return { timeToComplete, completionType };
}

function abortableTimeout(
  controller: AbortController,
  callback: (...args: any) => Promise<any>,
  ms: number,
  resolve: (value: any) => void
) {
  console.log("in abortableTimeout", controller.signal);
  const timeout = setTimeout(callback, ms);
  controller.signal.addEventListener(
    "abort",
    () => {
      clearTimeout(timeout);
      resolve("Operation aborted");
    },
    { once: true }
  );
}
