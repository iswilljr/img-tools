import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
