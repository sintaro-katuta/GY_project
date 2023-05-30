import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '../lib/firebase.config'


initializeFirebaseApp()
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
