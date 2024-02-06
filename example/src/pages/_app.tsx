import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Metadata } from "next";
import { ElvisProvider } from "react-elvis";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ElvisProvider>
      <Component {...pageProps} />
    </ElvisProvider>
  );
}
