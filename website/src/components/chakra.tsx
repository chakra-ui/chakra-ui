import { ChakraProvider, cookieStorageManager } from "@chakra-ui/core"
import { GetServerSidePropsContext } from "next"
import theme from "theme"

interface ChakraProps {
  cookies?: string
  children: React.ReactNode
}

export const Chakra = ({ children, cookies }: ChakraProps) => {
  return (
    <ChakraProvider
      resetCSS
      theme={theme}
      storageManager={
        typeof cookies === "string" ? cookieStorageManager(cookies) : undefined
      }
      portalZIndex={40}
    >
      {children}
    </ChakraProvider>
  )
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
