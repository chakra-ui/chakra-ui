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
        colorModeManager={
          typeof cookies === "string"
            ? cookieStorageManager(cookies)
            : localStorageManager
        }
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
