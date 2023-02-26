import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Inter } from '@next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const Toaster = dynamic(() => import('react-hot-toast').then(module => module.Toaster));

const inter = Inter({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title>Image Tools</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        containerClassName=""
        toastOptions={{ className: '!bg-dark-4 !text-white !shadow-lg' }}
      />
    </div>
  );
}
