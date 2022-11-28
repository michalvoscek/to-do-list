import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {DataLoader} from '../contexts/AppContext'
import {Layout} from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return <DataLoader>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </DataLoader>
}
