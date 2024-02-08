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
import { deepOverwrite } from "../../helpers/deepOverwrite";

interface CustomizableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hoverStyle?: React.CSSProperties;
}
const CustomizableButton: React.FunctionComponent<CustomizableButtonProps> = (
  props
) => {
  const [s, setS] = useState<React.CSSProperties | undefined>(props.style);
  const { hoverStyle, style, children, ...passThroughProps } = props;
  return (
    <button
      {...passThroughProps}
      style={s}
      onMouseEnter={(e) => {
        setS(deepOverwrite({ ...props.style }, { ...props.hoverStyle }));
        props.onMouseEnter ? props.onMouseEnter(e) : null;
      }}
      onMouseLeave={(e) => {
        setS(props.style);
        props.onMouseLeave ? props.onMouseLeave(e) : null;
      }}
    >
      {props.children}
    </button>
  );
};
export default CustomizableButton;
