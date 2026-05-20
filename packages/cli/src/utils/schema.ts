import { z } from "zod"

export const compositionFileSchema = z.object({
  type: z.string(),
  id: z.string(),
  file: z.object({
    name: z.string(),
    content: z.string(),
  }),
  component: z.string(),
  npmDependencies: z.array(z.string()),
  fileDependencies: z.array(z.string()),
})

export interface CompositionFile extends z.infer<
  typeof compositionFileSchema
> {}

export const compositionIndexSchema = z.array(
  z.object({
    type: z.string(),
    id: z.string(),
    file: z.string(),
    component: z.string(),
    npmDependencies: z.array(z.string()),
    fileDependencies: z.array(z.string()),
  }),
)

export interface Compositions extends z.infer<typeof compositionIndexSchema> {}

export const processEnvSchema = z.object({
  // REGISTRY_URL: z.string().default("http://localhost:3000"),
  REGISTRY_URL: z.string().default("https://chakra-v3-docs.vercel.app"),
  /** Base URL for docs site API (types, theme, search, examples). */
  CHAKRA_DOCS_URL: z.string().url().default("https://chakra-ui.com"),
  HTTPS_PROXY: z.string().optional(),
})

export const componentListSchema = z.object({
  components: z.array(z.string()),
  charts: z.array(z.string()),
})

export type ComponentList = z.infer<typeof componentListSchema>

export const searchItemSchema = z.object({
  label: z.string(),
  slug: z.string(),
  url: z.string(),
  description: z.string(),
  category: z.string(),
})

export type SearchItem = z.infer<typeof searchItemSchema>

export const searchResultsSchema = z.array(searchItemSchema)

export const themeEntrySchema = z.object({
  key: z.string(),
  values: z.unknown(),
})

export const themeIndexSchema = z.array(themeEntrySchema)

export type ThemeEntry = z.infer<typeof themeEntrySchema>

export const proBlockResponseSchema = z
  .object({
    files: z
      .array(
        z.object({
          filename: z.string().optional(),
          content: z.string().optional(),
        }),
      )
      .optional(),
  })
  .passthrough()

export type ProBlockResponse = z.infer<typeof proBlockResponseSchema>

export const addCommandFlagsSchema = z.object({
  force: z.boolean().optional(),
  dryRun: z.boolean().optional(),
  outdir: z.string().optional(),
  all: z.boolean().optional(),
  tsx: z.boolean().optional(),
})

export interface AddCommandFlags extends z.infer<
  typeof addCommandFlagsSchema
> {}
