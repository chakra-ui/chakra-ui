import { MDXComponents } from 'components/mdx-components'
import { allFigmas } from 'contentlayer/generated'
import MDXLayout from 'layouts/mdx'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function Page({
  figma,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(figma.body.code)
  return (
    <MDXLayout frontmatter={figma.frontMatter}>
      <Component components={MDXComponents as any} />
    </MDXLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const figmas = allFigmas
    .map((t) =>
      t._id.replace('figma/', '').replace('.mdx', '').replace('index', ''),
    )
    .map((id) => ({ params: { slug: [id.replace('figma/', '')] } }))

  return { paths: figmas, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]
  const figma = allFigmas.find((figma) => figma._id.includes(params.join('/')))
  return { props: { figma } }
}
