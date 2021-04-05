import React from "react"
import ChangelogMarkdown from "../../CHANGELOG.md"
import { MDXLayoutProvider } from "../layouts/mdx"

function Changelog() {
  return (
    <MDXLayoutProvider>
      <ChangelogMarkdown />
    </MDXLayoutProvider>
  )
}

export default Changelog
