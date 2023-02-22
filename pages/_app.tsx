import Head from 'next/head';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title>Image Tools</title>
      </Head>
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
