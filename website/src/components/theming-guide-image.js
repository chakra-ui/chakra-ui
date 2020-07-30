import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Box } from "@chakra-ui/core"

function useData() {
  return useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "theming-guide" } }) {
        edges {
          node {
            base
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
}

function getImage(data, src) {
  return data.allFile.edges.find((edge) => edge.node.base === src)
}

export function BadgeSpec() {
  const data = useData()
  const badge = getImage(data, "badge-spec.png")
  return (
    <Box maxWidth="400px" paddingY="40px">
      <Img fluid={{ ...badge.node.childImageSharp.fluid }} />
    </Box>
  )
}

export function ButtonSpec() {
  const data = useData()
  const badge = getImage(data, "button-spec.png")
  return (
    <Box maxWidth="400px" paddingY="40px">
      <Img fluid={{ ...badge.node.childImageSharp.fluid }} />
    </Box>
  )
}
