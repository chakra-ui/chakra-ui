import { Box } from "@chakra-ui/core"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import SEO from "../components/seo"

const Body = (props) => {

  return (
    <Box mx="auto" maxW="48rem" mt="1em">
      <MDXRenderer>{props.body}</MDXRenderer>
    </Box>
  )
}

const Docs = (frontmatter) => ({ children: data }) => {
  const { title, description } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <Body
        body={data}
      />
    </>
  )
}

export default Docs
