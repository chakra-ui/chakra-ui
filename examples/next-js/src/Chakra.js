import { ChakraProvider } from "@chakra-ui/core"

export const Chakra = ({ children, cookies }) => {
  return <ChakraProvider colorModeCookie={cookies}>{children}</ChakraProvider>
}

export const getServerSideProps = ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  }
}
