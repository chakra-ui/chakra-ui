import { createExcerpt, parseMarkdownFile } from "@docusaurus/utils"
import { siteConfig } from "configs/site-config"
import path from "path"
import shell from "shelljs"
import { processFrontmatter } from "utils/mdx-utils"

async function loadMDXFromPages(mdxDir = "guides"): Promise<unknown> {
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
    return processFrontmatter({
      ...frontMatter,
      baseEditUrl: siteConfig.repo.editUrl,
      excerpt: createExcerpt(content),
      path: mdxPath,
    })
  })

  return Promise.all(dataPromise)
}

export default loadMDXFromPages
