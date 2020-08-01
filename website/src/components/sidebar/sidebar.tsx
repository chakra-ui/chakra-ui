import { Box } from "@chakra-ui/core"
import { useRouter } from "next/router"
import * as React from "react"
import sidebar from "sidebar.config"

const Sidebar = () => {
  const { asPath: slug } = useRouter()
  const { routes } = sidebar
  return (
    <Box
      as="aside"
      pos="sticky"
      top="6rem"
      w="300px"
      pr="10"
      pb="40px"
      overflowY="auto"
      flexShrink={0}
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
    >
      {JSON.stringify(routes)}
    </Box>
  )
}

export default Sidebar
