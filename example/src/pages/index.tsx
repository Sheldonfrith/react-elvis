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
import ExampleForm_NoFeedbackDisplay from "../components/example-forms/ExampleForm_NoFeedbackDisplay";
import ExampleForm_FeedbackAtBottomOnly from "../components/example-forms/ExampleForm_FeedbackAtBottomOnly";
import ExampleForm_IntegratedFeedback from "../components/example-forms/ExampleForm_IntegratedFeedback";
import { TestContext } from "../components/TestContext";
import { useContext } from "react";
export default function Home() {
  return (
    <main
      className={`flex w-full min-h-screen flex-col items-center justify-between p-24 pt-12`}
    >
      <div className={`flex flex-col w-full max-w-2xl`}>
        <h1 className={`text-4xl font-bold text-center mb-8`}>
          <a
            href="https://github.com/sheldonfrith/react-elvis"
            className="text-blue-500 hover:underline"
          >
            React-Elvis
          </a>{" "}
          Example Page
        </h1>
        <a
          className={`text-2xl font-bold text-center mb-8 text-blue-500 hover:underline cursor-pointer`}
          href="https://github.com/sheldonfrith/react-elvis"
        >
          See all the code on Github
        </a>

        {/* <ElvisDefault /> */}
        <h2 className={`text-2xl font-bold text-center`}>
          {" "}
          Feedback via Popup 📰
        </h2>
        <ExampleForm_NoFeedbackDisplay formId="viaGlobalPopup" />
        <h1 className={`text-2xl font-bold text-center`}>
          {" "}
          Feedback at the Bottom ⬇️{" "}
        </h1>

        <ExampleForm_FeedbackAtBottomOnly formId="viaBottomOnly" />
        <i className="mb-6">
          💡 Hint: Type something non-numeric to see how input errors can be
          displayed...
        </i>
        <h1 className={`text-2xl font-bold text-center`}>
          {" "}
          Feedback Integrated 🤝{" "}
        </h1>
        <ExampleForm_IntegratedFeedback formId="viaVariousChannels" />
      </div>
    </main>
  );
}
