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
import { remarkCard } from "./lib/remark-card"
import { remarkCodeTitle } from "./lib/remark-code-title"
import { remarkCodeGroup } from "./lib/remark-codegroup"
import { remarkSteps } from "./lib/remark-steps"

const docs = defineCollection({
  name: "Docs",
  pattern: ["content/docs/**/*.mdx"],
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      metadata: s.metadata(),
      content: s.markdown(),
      status: s.string().optional(),
      toc: s.toc(),
      code: s.mdx(),
      links: s
        .array(s.object({ title: s.string(), url: s.string() }))
        .optional(),
    })
    .transform((data, { meta }) => {
      return {
        ...data,
        slug: meta.path
          .replace(/.*\/content\//, "")
          .replace(/\.mdx$/, "")
          .replace(process.cwd(), ""),
        category: meta.path
          .replace(/.*\/content\//, "")
          .replace(/\/[^/]*$/, "")
          .replace(process.cwd(), ""),
      }
    }),
})

const notes = defineCollection({
  name: "Notes",
  pattern: "content/notes/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    metadata: s.metadata(),
    content: s.markdown(),
    code: s.mdx(),
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
  collections: { docs, showcases, notes },
  mdx: {
    remarkPlugins: [
      remarkDirective,
      remarkGfm,
      remarkCallout,
      remarkCodeTitle,
      remarkCodeGroup,
      remarkSteps,
      remarkCard,
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
