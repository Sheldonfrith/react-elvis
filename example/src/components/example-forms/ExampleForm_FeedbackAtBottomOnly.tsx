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
import React from "react";
import { customMockRequest } from "../../lib/helpers/mockAsyncFunctions";
import * as elvis from "../../lib/hooks/react-elvis";
import { customFunctionConfig } from "../../lib/config/messages";
import TextInput from "./TextInputs";
import SelectInput from "./SelectInput";
import {
  badButton,
  disabledButton,
  goodButton,
  neutralButton,
  primaryButton,
} from "../../styles/tailwindHelpers";
import LoadingSpinner from "../LoadingSpinner";

interface ExampleForm_FeedbackAtBottomOnlyDisplayProps {
  formId: string;
}
const ExampleForm_FeedbackAtBottomOnlyDisplay: React.FunctionComponent<
  ExampleForm_FeedbackAtBottomOnlyDisplayProps
> = ({ formId }) => {
  const { f: definedFunction, abortController: _ } = elvis.useWrap_Abortable(
    "customFunction_" + formId,
    (controller: AbortController, v: EventTarget) =>
      customMockRequest(controller, v),
    customFunctionConfig
  );
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formValues = event.target;
    console.log("Form Values", formValues);
    definedFunction(formValues);
  }
  const { error, clearError, residualError } = elvis.useHandleErrorDisplay(
    "customFunction_" + formId
  );
  const { loading, cancelled, success, abortController } =
    elvis.useHandleLoadingDisplay("customFunction_" + formId, 1000, 1000);

  return (
    <form
      className="border border-white p-4 flex flex-col w-full rounded-md bg-gray-900 m-4 mb-8"
      onSubmit={handleSubmit}
    >
      <SelectInput />
      <TextInput />
      <div className="flex flex-row ">
        {loading && !error ? (
          <button type="button" className={primaryButton} disabled>
            <LoadingSpinner size="0.6em" />
          </button>
        ) : cancelled && !error ? (
          <button type="button" className={badButton} disabled>
            {cancelled.title}
          </button>
        ) : success && !error ? (
          <button type="button" className={goodButton} disabled>
            {success.title}
          </button>
        ) : error ? (
          <button
            type="button"
            className={neutralButton}
            onClick={(e) => {
              e.preventDefault();
              clearError();
            }}
          >
            Ignore
          </button>
        ) : (
          <button
            type="submit"
            className={primaryButton}

            // className="bg-blue-500 w-full text-white p-2 rounded-md m-4 hover:bg-blue-700"
          >
            Submit
          </button>
        )}
        {abortController && loading ? (
          <button
            type="button"
            className={neutralButton}
            onClick={(e) => {
              e.preventDefault();
              abortController.abort();
            }}
          >
            Cancel
          </button>
        ) : error && error.canIgnore ? (
          <button
            type="button"
            className={badButton}
            onClick={(e) => {
              e.preventDefault();
              //restart the app
              window.location.reload();
            }}
          >
            Reload
          </button>
        ) : (
          // placeholder button, grayed out
          <button type="button" className={disabledButton} disabled>
            Cancel
          </button>
        )}
      </div>
      {residualError ? (
        <div className="flex flex-col">
          <p className="text-red-500">
            {residualError.title}: {residualError.message}
          </p>
        </div>
      ) : null}
    </form>
  );
};
export default ExampleForm_FeedbackAtBottomOnlyDisplay;
