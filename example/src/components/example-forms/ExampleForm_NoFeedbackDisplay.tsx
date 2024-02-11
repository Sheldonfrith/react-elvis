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
import React, { useContext } from "react";
import { customMockRequest } from "../../lib/helpers/mockAsyncFunctions";
import { customFunctionConfig } from "../../lib/config/messages";
import TextInput from "./TextInputs";
import SelectInput from "./SelectInput";
import { primaryButton } from "../../styles/tailwindHelpers";
import { TestContext } from "../TestContext";
import { useElvis } from "react-elvis";

interface ExampleForm_FeedbackAtBottomOnlyDisplayProps {
  formId: string;
}
const ExampleForm_FeedbackAtBottomOnlyDisplay: React.FunctionComponent<
  ExampleForm_FeedbackAtBottomOnlyDisplayProps
> = ({ formId }) => {
  const context = useContext(TestContext);
  const elvis = useElvis();
  const definedFunction = elvis.async.abortable.register(
    "customFunction_" + formId,
    customMockRequest,
    customFunctionConfig
  );
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!definedFunction) {
      return;
    }
    definedFunction(event.target);
  }

  return (
    <form
      className="border border-white p-4 flex flex-col w-full rounded-md bg-gray-900 m-4 mb-8"
      onSubmit={handleSubmit}
    >
      <SelectInput
        onChangeOverride={(e) => {
          context.setReturnType(e.target.value);
        }}
        valueOverride={context.returnType}
      />
      <TextInput
        onChangeOverride={(e) => {
          context.setTimeToCompletion(e.target.value);
        }}
        valueOverride={context.timeToCompletion}
      />

      <div className="flex flex-row">
        <button type="submit" className={primaryButton}>
          Submit
        </button>
      </div>
    </form>
  );
};
export default ExampleForm_FeedbackAtBottomOnlyDisplay;
