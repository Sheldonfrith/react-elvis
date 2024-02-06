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

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
}
const LoadingSpinner: React.FunctionComponent<LoadingSpinnerProps> = ({
  size,
  color,
}) => {
  if (!color) {
    color = "white";
  }
  return (
    <span
      style={{
        fontSize: size || "1em",
        verticalAlign: "middle",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `.elvis-loading-spinner {
  display: inline-block;
  width: 2.5em;
  height: 2.5em;
}
.elvis-loading-spinner:after {
  content: " ";
  display: block;
  width: 2.5em;
  height: 2.5em;
  margin: 0.2em;
  border-radius: 50%;
  border: 0.3em solid ${color};
  animation: elvis-loading-spinner 1.0s linear infinite;
  border-color: ${color} transparent ${color} transparent;
}
@keyframes elvis-loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`,
        }}
      />
      <div className="elvis-loading-spinner"></div>
    </span>
  );
};
export default LoadingSpinner;
