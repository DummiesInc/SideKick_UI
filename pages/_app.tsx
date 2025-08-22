import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from 'flowbite-react';
import Layout from '@/src/components/Layout';
import { ThemeInit } from '../.flowbite-react/init';

const customTheme = createTheme({
  navbar: {
    link: {
      active: {
        on: 'text-orange-500 font-semibold', // ✅ active link is black
        off: 'text-gray-700 hover:text-orange-400' // inactive
      }
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <ThemeInit />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
