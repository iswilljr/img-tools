import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import { defaultSeo } from '@/next-seo.config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const Toaster = dynamic(() => import('react-hot-toast').then(module => module.Toaster), { ssr: false });
const Progress = dynamic(() => import('nextjs-progressbar'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <DefaultSeo {...defaultSeo} />
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        containerClassName=""
        toastOptions={{ className: '!bg-dark-4 !text-white/90 !shadow-lg' }}
      />
      <Progress color="#1F52A1" options={{ showSpinner: false }} />
    </div>
  );
}
