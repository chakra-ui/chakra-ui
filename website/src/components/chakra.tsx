import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/core"
import { GetServerSidePropsContext } from "next"
import theme from "theme"

type WithCookies = {
  cookies?: string
}

const determineColorModeManager = (cookies?: string) => {
  const isBrowser = typeof window !== "undefined"
  const isServer = typeof cookies !== "undefined"

  const actualCookies = isServer
    ? cookies
    : isBrowser
    ? document.cookie
    : undefined

  console.log({
    isBrowser,
    isServer,
    actualCookies,
  })

  return actualCookies
    ? cookieStorageManager(actualCookies)
    : localStorageManager
}

/**
 * higher order component for pages
 */
export function withChakra<P = {}>(
  WrappedComponent: React.FunctionComponent<P>,
) {
  const C = ({ cookies, ...rest }: WithCookies & P) => {
    return (
      <ChakraProvider
        theme={theme}
        colorModeManager={determineColorModeManager(cookies)}
        portalZIndex={40}
      >
        <WrappedComponent {...(rest as P)} />
      </ChakraProvider>
    )
  }

  C.displayName = `withChakra(${
    WrappedComponent.displayName || WrappedComponent.name || "Unknown"
  })`
  C.WrappedComponent = WrappedComponent

  return C
}

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>

export function getServerSideProps({
  req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  }
}
