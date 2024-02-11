import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Metadata } from "next";

import TestProvider from "../components/TestContext";
import { ElvisProvider, ElvisDefault } from "react-elvis";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ElvisProvider>
      <ElvisDefault />
      <TestProvider>
        <Component {...pageProps} />
      </TestProvider>
    </ElvisProvider>
  );
}
