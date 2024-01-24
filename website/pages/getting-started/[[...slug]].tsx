import { MDXComponents } from 'components/mdx-components'
import { allGuides, Guide } from 'contentlayer/generated'
import MDXLayout from 'layouts/mdx'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { toArray } from 'utils/js-utils'

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc.body.code)
  return (
    <MDXLayout frontmatter={doc.frontMatter}>
      <Component components={MDXComponents as any} />
    </MDXLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allGuides
    .map((t) => t._id.replace('getting-started/', '').replace('.mdx', ''))
    .map((id) => ({ params: { slug: id === 'index' ? [] : id.split('/') } }))
  return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = toArray(ctx.params.slug)
  let doc: Guide
  if (params.length === 0) {
    doc = allGuides.find((t) => t._id === 'getting-started/index.mdx')
  } else {
    doc = allGuides.find((guide) =>
      guide._id.endsWith(`${params.join('/')}.mdx`),
    )
  }
  return { props: { doc } }
}
