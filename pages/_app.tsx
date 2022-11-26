import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {DataLoader} from '../contexts/AppContext'

export default function App({ Component, pageProps }: AppProps) {
  return <DataLoader>
    <Component {...pageProps} />
  </DataLoader>
}
