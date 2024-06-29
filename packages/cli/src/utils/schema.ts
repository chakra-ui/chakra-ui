import { z } from "zod"

export const compositionFile = z.object({
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

export const compositionIndex = z.array(
  z.object({
    type: z.string(),
    id: z.string(),
    file: z.string(),
    component: z.string(),
    npmDependencies: z.array(z.string()),
    fileDependencies: z.array(z.string()),
  }),
)

export const processEnv = z.object({
  // REGISTRY_URL: z.string().default("http://localhost:3000"),
  REGISTRY_URL: z.string().default("https://chakra-v3-docs.vercel.app"),
  HTTPS_PROXY: z.string().optional(),
})

export const addCommandFlags = z.object({
  dryRun: z.boolean().optional(),
  outdir: z.string(),
  jsx: z.boolean().optional(),
  all: z.boolean().optional(),
})
