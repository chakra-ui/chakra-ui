import { createExcerpt, parseMarkdownFile } from "@docusaurus/utils"
import siteConfig from "configs/site-config"
import path from "path"
import shell from "shelljs"

async function loadMDXFromPages(mdxDir = "guides") {
  const { processFrontmatter } = require("utils/mdx-utils")

  const dir = path.join(process.cwd(), `pages/${mdxDir}`)
  const filenames = shell.ls("-R", `${dir}/**/*.mdx`)

  const dataPromise = filenames.map(async (filename) => {
    // get the `pages` directory
    const pagesDir = path.join(process.cwd(), "pages")

    // gets the relative mdx path
    // pages/docs/guides.mdx => /docs/guides.mdx
    const mdxPath = path.relative(pagesDir, filename)

    // extract frontmatter and content from markdown string
    const { frontMatter, content } = await parseMarkdownFile(filename)

    // extends frontmatter with more useful information
    const _frontmatter = await processFrontmatter({
      ...frontMatter,
      path: mdxPath,
      baseEditUrl: siteConfig.repo.editUrl,
      excerpt: createExcerpt(content),
    })

    return _frontmatter
  })

  const data = await Promise.all(dataPromise)

  return data
}

export default loadMDXFromPages
