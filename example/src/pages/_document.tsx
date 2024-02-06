import { Metadata } from "next";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Elvis Example</title>
        <meta
          name="description"
          content="Error and Loading Visualizer for React"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
