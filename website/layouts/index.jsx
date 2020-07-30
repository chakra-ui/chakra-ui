import { Box } from "@chakra-ui/core"
import SEO from "components/seo"
import React from "react"

const DefaultLayout = (frontmatter) => ({ children: data }) => {
  const { title, description } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <Box mx="auto" maxW="48rem" mt="1em">
        {data}
      </Box>
    </>
  )
}

export default DefaultLayout
