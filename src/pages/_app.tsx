import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '../lib/firebase.config'
import "../styles/global.css";

initializeFirebaseApp()
export default function App({ Component, pageProps, router }: AppProps) {
  return <Component {...pageProps} key={router.asPath} />
}
