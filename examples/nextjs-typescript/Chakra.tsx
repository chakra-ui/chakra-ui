import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/core"
import { GetServerSidePropsContext } from "next"
import { ReactNode } from "react"

interface ChakraProps {
  cookies?: string
  children: ReactNode
}

export const Chakra = ({ children, cookies }: ChakraProps) => {
  return (
    <ChakraProvider
      colorModeManager={
        cookies ? cookieStorageManager(cookies) : localStorageManager
      }
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
