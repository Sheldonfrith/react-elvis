import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ElvisProvider from "../components/contexts/ElvisContext";
import { Metadata } from "next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ElvisProvider
      config={
        {
          // disableDefaultErrorDisplayerCheck: true,
          // disableDefaultLoadingDisplayerCheck: true,
        }
      }
    >
      <Component {...pageProps} />
    </ElvisProvider>
  );
}
