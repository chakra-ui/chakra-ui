import { Chakra } from "../src/provider"

export default function App({ Component, pageProps }) {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  )
}
