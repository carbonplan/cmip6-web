import { ThemeProvider } from 'theme-ui'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '../theme'
import { RegionProvider } from '../components/region'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <RegionProvider>
        <Component {...pageProps} />
      </RegionProvider>
    </ThemeProvider>
  )
}

export default App
