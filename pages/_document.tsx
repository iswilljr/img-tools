import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth [-webkit-tap-highlight-color:transparent] [color-scheme:dark]">
      <Head />
      <body className=" overflow-x-hidden bg-dark-10 text-white/90">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
