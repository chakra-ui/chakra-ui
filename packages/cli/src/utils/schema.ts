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

export interface CompositionFile
  extends z.infer<typeof compositionFileSchema> {}

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
  HTTPS_PROXY: z.string().optional(),
})

export const addCommandFlagsSchema = z.object({
  force: z.boolean().optional(),
  dryRun: z.boolean().optional(),
  outdir: z.string().optional(),
  all: z.boolean().optional(),
  tsx: z.boolean().optional(),
})

export interface AddCommandFlags
  extends z.infer<typeof addCommandFlagsSchema> {}
