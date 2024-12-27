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
interface ElvisDefaultColors {
    neutral: string;
    good: string;
    bad: string;
    background: string;
    text: string;
    semiTransparentText: string;
}
interface ElvisDefaultFontFamily {
    title: string;
    body: string;
}
interface ElvisDefaultText {
    ignore: string;
    cancel: string;
    reload: string;
}
interface OptionalElvisDefaultProps {
    cancelledStatusDuration_ms?: number;
    successStatusDuration_ms?: number;
    colors?: Partial<ElvisDefaultColors>;
    fontFamily?: Partial<ElvisDefaultFontFamily>;
    text?: Partial<ElvisDefaultText>;
}
export declare const ElvisDefault: React.FC<OptionalElvisDefaultProps>;
export {};
