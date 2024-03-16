import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { FontFace } from 'components/font-face'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { getSeo } from 'utils/seo'

const App = ({ Component, pageProps }) => {
  const seo = getSeo()

  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://static.cloudflareinsights.com' />
        <meta name='theme-color' content='#319795' />
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain='chakra-ui.com'
            src='https://plausible.io/js/plausible.js'
          />
        )}
      </Head>
      <DefaultSeo {...seo} />
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider
          attribute='class'
          disableTransitionOnChange
          forcedTheme={Component.theme || null}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
      <FontFace />
    </>
  )
}

export default App
