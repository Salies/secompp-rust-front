import '../styles/globals.css'
import Header from './header'

function MyApp({ Component, pageProps }) {
  return <div>
    <Header></Header>
    <div className="wrapper"><Component {...pageProps} /></div>
  </div>
}

export default MyApp
