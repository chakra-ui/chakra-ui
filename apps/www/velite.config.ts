import rehypeShiki from "@shikijs/rehype"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"
import { defineCollection, defineConfig, s } from "velite"
import { remarkCallout } from "./lib/remark-callout"
import { remarkCodeTitle } from "./lib/remark-code-title"
import { remarkCodeGroup } from "./lib/remark-codegroup"
import { remarkSteps } from "./lib/remark-steps"

const betaComponents = ["carousel", "qr-code", "signature-pad", "tree-view"]

const pages = defineCollection({
  name: "Components",
  pattern: ["content/**/*.mdx"],
  schema: s
    .object({
      id: s.string(),
      title: s.string(),
      description: s.string(),
      metadata: s.metadata(),
      content: s.markdown(),
      status: s.string().optional(),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => {
      return {
        ...data,
        status: betaComponents.includes(data.id) ? "preview" : undefined,
        slug: meta.path.replace(/.*\/pages\//, "").replace(/\.mdx$/, ""),
        category: meta.path.replace(/.*\/pages\//, "").replace(/\/[^/]*$/, ""),
      }
    }),
})

const showcases = defineCollection({
  name: "Showcases",
  pattern: "content/showcases.json",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    url: s.string(),
    image: s.string(),
  }),
})

export default defineConfig({
  root: process.cwd(),
  collections: { pages, showcases },
  mdx: {
    remarkPlugins: [
      remarkDirective,
      remarkGfm,
      remarkCallout,
      remarkCodeTitle,
      remarkCodeGroup,
      remarkSteps,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeShiki,
        {
          transformers: [
            transformerNotationDiff(),
            transformerNotationFocus(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
            transformerMetaHighlight(),
            transformerMetaWordHighlight(),
          ],
          themes: {
            light: "github-light",
            dark: "vesper",
          },
          defaultColor: "light",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
