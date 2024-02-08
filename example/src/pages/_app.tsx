import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Metadata } from "next";

import TestProvider from "../components/TestContext";
import { ElvisDefault, ElvisProvider } from "../react-elvis";
import Test2Provider from "../components/Test2Context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ElvisProvider>
      <ElvisDefault />
      <TestProvider>
        <Test2Provider>
          <Component {...pageProps} />
        </Test2Provider>
      </TestProvider>
    </ElvisProvider>
  );
}
