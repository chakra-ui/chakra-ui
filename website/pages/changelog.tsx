import { parseMarkdownFile } from "@docusaurus/utils"
import path from "path"
import React from "react"
import { MDXLayoutProvider } from "../layouts/mdx"
import ChangelogContent from "../../CHANGELOG.md"

// DOM code
function Changelog({ content }) {
  return (
    <MDXLayoutProvider>
      <ChangelogContent />
    </MDXLayoutProvider>
  )
}

// Node.js
// export async function getStaticProps() {
//   const filePath = path.resolve("..", "CHANGELOG.md")
//   const { content } = await parseMarkdownFile(filePath)
//   return {
//     props: { content },
//   }
// }

export default Changelog
