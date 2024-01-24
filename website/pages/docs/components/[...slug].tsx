import { MDXComponents } from 'components/mdx-components'
import ComponentDocsLayout from 'layouts/component'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import {
  getComponentTabsData,
  getDocByType,
  getDocDoc,
} from 'utils/contentlayer-utils'
import { uniq } from 'utils/js-utils'

export default function Page({
  doc,
  tabsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc?.body?.code)
  return (
    <ComponentDocsLayout frontmatter={doc?.frontMatter} tabsData={tabsData}>
      <Component components={MDXComponents as any} />
    </ComponentDocsLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = uniq(
    getDocByType('components').flatMap((doc) => [
      doc.slug,
      `/${doc._raw.sourceFileDir}`,
    ]),
  )
  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const tabsData = getComponentTabsData(['components', ctx.params.slug])
  return {
    props: {
      doc: getDocDoc(['components', ctx.params.slug]),
      tabsData,
    },
  }
}
