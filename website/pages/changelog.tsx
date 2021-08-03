import React from "react"
import { MDXRemote } from "next-mdx-remote"
import { MDXComponents } from "components/mdx-components"
import { InferGetStaticPropsType } from "next"
import Layout from "layouts"
import { loadMdx } from "utils/load-mdx"

function Changelog({
  mdxSource,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </Layout>
  )
}

export async function getStaticProps() {
  const changelogPath = ["..", "CHANGELOG.md"].join("/")
  const page = await loadMdx(changelogPath)

  const { mdxSource: processedMdxSource, ...processedFrontmatter } = page

  return {
    props: {
      mdxSource: processedMdxSource,
      frontMatter: processedFrontmatter,
    },
  }
}
export default Changelog
