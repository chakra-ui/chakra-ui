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
import { docsConfig } from "./docs.config"
import { remarkCallout } from "./lib/remark-callout"
import { remarkCard } from "./lib/remark-card"
import { remarkCodeTitle } from "./lib/remark-code-title"
import { remarkCodeGroup } from "./lib/remark-codegroup"
import { remarkSteps } from "./lib/remark-steps"

const cwd = process.cwd()

const slugify = (str: string) => {
  return str
    .replace(/.*\/content\//, "")
    .replace(/\.mdx$/, "")
    .replace(cwd, "")
}

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
      hideToc: s.boolean().optional(),
      composition: s.boolean().optional(),
      links: s
        .object({
          source: s.string().optional(),
          storybook: s.string().optional(),
          recipe: s.string().optional(),
          ark: s.string().optional(),
        })
        .optional(),
    })
    .transform((data, { meta }) => {
      const links = data.links || {}
      return {
        ...data,
        slug: slugify(meta.path),
        links: {
          ...links,
          source: links.source
            ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/${links.source}`
            : undefined,
          storybook: links.storybook
            ? `${docsConfig.storybookUrl}/?path=/story/${links.storybook}`
            : undefined,
          recipe: links.recipe
            ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/theme/recipes/${links.recipe}.ts`
            : undefined,
        },
        category: meta.path
          .replace(/.*\/content\//, "")
          .replace(/\/[^/]*$/, "")
          .replace(cwd, ""),
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
    description: s.string().optional(),
    url: s.string(),
    image: s.string(),
  }),
})

const blogs = defineCollection({
  name: "Blog",
  pattern: "content/blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      type: s.enum(["release", "announcement", "article"]),
      version: s.string().optional(),
      description: s.string(),
      metadata: s.metadata(),
      content: s.mdx(),
      authors: s.array(s.string()),
      publishedAt: s.string(),
      toc: s.toc(),
    })
    .transform((data, { meta }) => {
      return {
        ...data,
        slug: slugify(meta.path),
      }
    }),
})

export default defineConfig({
  root: cwd,
  collections: { docs, showcases, notes, blogs },
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
          theme: "dark-plus",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
          },
        },
      ],
    ],
  },
})
