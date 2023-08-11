import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={themeStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const themeStyle = "dark:bg-gray-900 bg-white";
