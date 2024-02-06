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
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";

interface SelectInputProps {
  classNameOverride?: string;
  onChangeOverride?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
}
const SelectInput: React.FunctionComponent<SelectInputProps> = ({
  classNameOverride,
  onChangeOverride,
  children,
}) => {
  return (
    <div className="flex flex-row w-full mb-2">
      <label className=" p-2 pr-16 rounded-md text-white w-16 mr-14 whitespace-nowrap text-lg">
        Result Type:
      </label>
      <select
        className={
          classNameOverride ||
          "border border-black  w-56 p-2 rounded-md text-black"
        }
        id="completionType"
        name="completionType"
        onChange={onChangeOverride}
      >
        <option value="success">Success</option>
        <option value="incorrectly-thrown-error">
          Incorrectly Thrown Error
        </option>
        <option value="correctly-thrown-error">Correctly Thrown Error</option>
        <option value="self-cancel">Self Cancel</option>
      </select>
      {children}
    </div>
  );
};
export default SelectInput;
