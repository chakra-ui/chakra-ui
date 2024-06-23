import { RemixBrowser } from "@remix-run/react"
import { StrictMode, startTransition } from "react"
import { hydrateRoot } from "react-dom/client"
import { ChakraProvider } from "./components/chakra-provider"
import { ClientCacheProvider } from "./emotion/emotion-client"

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ClientCacheProvider>
          <ChakraProvider>
            <RemixBrowser />
          </ChakraProvider>
        </ClientCacheProvider>
      </StrictMode>,
    )
  })
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1)
}
