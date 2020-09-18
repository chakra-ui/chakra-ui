import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/core"

export const Chakra = ({ children, cookies }) => {
  return (
    <ChakraProvider
      colorModeManager={
        typeof cookies === "string"
          ? cookieStorageManager(cookies)
          : localStorageManager
      }
    >
      {children}
    </ChakraProvider>
  )
}

export const getServerSideProps = ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  }
}
