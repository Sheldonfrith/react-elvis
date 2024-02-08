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

interface TextInputProps {
  classNameOverride?: string;
  onChangeOverride?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueOverride?: string;
  children?: React.ReactNode;
}
const TextInput: React.FunctionComponent<TextInputProps> = ({
  classNameOverride,
  onChangeOverride,
  valueOverride,
  children,
}) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <div>
        <label className=" p-2  whitespace-nowrap rounded-md text-white w-18 mr-16 text-lg">
          Delay:
        </label>
        <input
          className={
            classNameOverride ||
            "border border-black p-2 w-56 rounded-md text-black"
          }
          onChange={onChangeOverride}
          value={valueOverride}
          id="timeToComplete"
          name="timeToComplete"
          type="text"
          placeholder="seconds"
        />
      </div>
      {children}
    </div>
  );
};
export default TextInput;
