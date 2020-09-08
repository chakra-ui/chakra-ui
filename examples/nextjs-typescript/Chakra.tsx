import { ChakraProvider } from "@chakra-ui/core"
import { GetServerSidePropsContext } from "next"

interface ChakraProps {
  cookies?: string
  children: React.ReactNode
}

export const Chakra = ({ children, cookies }: ChakraProps) => {
  return <ChakraProvider colorModeCookie={cookies}>{children}</ChakraProvider>
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
