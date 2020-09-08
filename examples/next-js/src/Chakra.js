import { ChakraProvider, cookieStorageManager } from "@chakra-ui/core"

export const Chakra = ({ children, cookies }) => {
  return (
    <ChakraProvider
      resetCSS
      storageManager={
        typeof cookies === "string" ? cookieStorageManager(cookies) : undefined
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
