import React from "react"
import { Box, Link } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"

// export const Entry = ({ url, title, items }) => {
//   return (
//     <Box>
//       <Link as={GatsbyLink} href={url}>
//         {title}
//       </Link>
//     </Box>
//   )
// }

export const TableOfContents = ({ tableOfContents }) => {
  const { items } = tableOfContents
  return <Box>{JSON.stringify(tableOfContents, null, 2)}</Box>
}
