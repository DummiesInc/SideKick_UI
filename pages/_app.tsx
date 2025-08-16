import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {  createTheme, ThemeProvider } from "flowbite-react";
import Layout from '@/src/components/Layout';

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
    
  )
}
