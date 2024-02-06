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
import React, { useState, useEffect, ReactNode } from "react";
import { customMockRequest } from "../../lib/helpers/mockAsyncFunctions";
import * as elvis from "../../lib/hooks/react-elvis";
import { UserFacingError, UserFacingLoading } from "../../lib/config/types";
import { customFunctionConfig } from "../../lib/config/messages";
import { assert } from "../../lib/helpers/myAssert";
import { usePrevious } from "../../lib/hooks/usePrevious";
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
  const [formFieldErrors, setFormFieldErrors] = useState<
    { field: string; error: UserFacingError }[]
  >([]);
  const prevFormFieldErrors = usePrevious(formFieldErrors);
  const [inputsWithRedBorders, setInputsWithRedBorders] = useState<string[]>(
    []
  );
  const prevInputsWithRedBorders = usePrevious(inputsWithRedBorders);
  const [timeToCompletedField, setTimeToCompletedField] = useState<ReactNode>();
  const [resultTypeField, setResultTypeField] = useState<ReactNode>();
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
  const prevResidualError = usePrevious(residualError);
  const { loading, cancelled, success, abortController } =
    elvis.useHandleLoadingDisplay("customFunction_" + formId, 1000, 1000);

  //keep form field errors up to date
  useEffect(() => {
    if (
      residualError !== prevResidualError &&
      residualError &&
      residualError.optionalMetadata
    ) {
      const fieldName = residualError.optionalMetadata.inputField as string;
      assert(typeof fieldName === "string", "fieldName must be a string");
      setFormFieldErrors([
        {
          field: fieldName,
          error: residualError,
        },
      ]);

      setInputsWithRedBorders((prev) => {
        return prev.includes(fieldName) ? prev : [...prev, fieldName];
      });
    } else if (residualError !== prevResidualError && formFieldErrors.length) {
      setFormFieldErrors([]);
      setInputsWithRedBorders([]);
    }
  }, [residualError, formFieldErrors, prevResidualError]);

  useEffect(() => {
    // whenever red borders or formFieldErrors change, update the resultTypeField
    if (
      formFieldErrors === prevFormFieldErrors &&
      inputsWithRedBorders === prevInputsWithRedBorders
    )
      return;
    const thisError = formFieldErrors.find((x) => x.field === "completionType");
    const withRedBorder = inputsWithRedBorders.includes("completionType");
    const defaultClassName = "border border-black p-2 rounded-md text-black";
    const classNameIfError = `${
      withRedBorder ? "border-4 border-red-500" : "border border-black"
    } p-2 rounded-md text-black`;
    setResultTypeField(
      <SelectInput
        classNameOverride={thisError ? classNameIfError : undefined}
        onChangeOverride={() => {
          setInputsWithRedBorders((prev) => {
            return prev.filter((x) => x !== "completionType");
          });
        }}
      >
        {thisError ? (
          <div className="flex flex-col w-16">
            <p className="text-red-500">
              {thisError.error.title}: {thisError.error.message}
            </p>
          </div>
        ) : null}
      </SelectInput>
    );
  }, [
    formFieldErrors,
    inputsWithRedBorders,
    prevFormFieldErrors,
    prevInputsWithRedBorders,
  ]);

  useEffect(() => {
    // whenever red borders or formFieldErrors change, update the timeToCompletedField
    if (
      formFieldErrors === prevFormFieldErrors &&
      inputsWithRedBorders === prevInputsWithRedBorders
    )
      return;

    const thisError = formFieldErrors.find((x) => x.field === "timeToComplete");
    const withRedBorder = inputsWithRedBorders.includes("timeToComplete");
    const defaultClassName = "border border-black p-2 rounded-md text-black";
    const classNameIfError = `${
      withRedBorder ? "border-4 border-red-500" : "border border-black"
    } p-2 rounded-md text-black`;
    setTimeToCompletedField(
      <>
        <TextInput
          classNameOverride={thisError ? classNameIfError : undefined}
          onChangeOverride={() => {
            setInputsWithRedBorders((prev) => {
              return prev.filter((x) => x !== "timeToComplete");
            });
          }}
        ></TextInput>
        {thisError ? (
          <div className="flex flex-col">
            <p className="text-red-500">
              {thisError.error.title}: {thisError.error.message}
            </p>
          </div>
        ) : null}
      </>
    );
  }, [
    formFieldErrors,
    inputsWithRedBorders,
    prevFormFieldErrors,
    prevInputsWithRedBorders,
  ]);

  return (
    <form
      className="border border-white p-4 flex flex-col w-full rounded-md bg-gray-900 m-4 mb-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        {resultTypeField}
        {timeToCompletedField}
      </div>
      <div className="flex flex-row">
        {loading && !error ? (
          <button type="button" className={neutralButton} disabled>
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
          <button type="submit" className={primaryButton}>
            Submit
          </button>
        )}
        {abortController && loading ? (
          <button
            type="button"
            className={badButton}
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
      {residualError && !formFieldErrors.length ? (
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
