import Head from 'next/head';
import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '../lib/firebase.config'
import "../styles/global.css";

initializeFirebaseApp()
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>Foop</title>
      </Head>
      <Component {...pageProps} key={router.asPath} />
    </div>
  )
}
