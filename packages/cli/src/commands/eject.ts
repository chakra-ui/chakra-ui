import { defaultConfig } from "@chakra-ui/react"
import * as p from "@clack/prompts"
import { Command } from "commander"
import createDebug from "debug"
import { writeFile } from "node:fs/promises"
import { dirname } from "node:path"
import { join } from "node:path/posix"
import { kebabCase } from "scule"
import * as io from "../utils/io"
import { pretty } from "../utils/pretty"

const debug = createDebug("chakra:eject")

interface CodegenFlags {
  outdir: string
}

interface Artifact {
  path: string[]
  content: string
}

export const EjectCommand = new Command("eject")
  .description("Take control over the default theme tokens and recipes")
  .option(
    "-o, --outdir <DIR>",
    "The output directory to write the files",
    "theme",
  )
  .action(async (flags: CodegenFlags) => {
    debug("flags", flags)

    const artifacts: Artifact[] = []

    /* -----------------------------------------------------------------------------
     * Global CSS
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting global CSS...")

    const globalCss = defaultConfig.globalCss ?? ""
    const globalCssContent = `
    import { defineGlobalStyles } from "@chakra-ui/react"

    export const globalCss = defineGlobalStyles(${JSON.stringify(globalCss, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "global-css.ts"],
      content: globalCssContent,
    })

    /* -----------------------------------------------------------------------------
     * Breakpoints
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting breakpoints...")

    const breakpoints = defaultConfig.theme?.breakpoints ?? {}
    const breakpointContent = `export const breakpoints = ${JSON.stringify(breakpoints, null, 2)}`
    artifacts.push({
      path: [flags.outdir, "breakpoints.ts"],
      content: breakpointContent,
    })

    /* -----------------------------------------------------------------------------
     * Keyframes
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting keyframes...")

    const keyframes = defaultConfig.theme?.keyframes ?? {}
    const keyframesContent = `export const keyframes = ${JSON.stringify(keyframes, null, 2)}`
    artifacts.push({
      path: [flags.outdir, "keyframes.ts"],
      content: keyframesContent,
    })

    /* -----------------------------------------------------------------------------
     * Tokens
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting tokens...")

    const tokens = defaultConfig.theme?.tokens ?? {}
    generateTokenArtifacts(tokens, artifacts, flags)

    const semanticTokens = defaultConfig.theme?.semanticTokens ?? {}
    generateSemanticTokenArtifacts(semanticTokens, artifacts, flags)

    /* -----------------------------------------------------------------------------
     * Recipes
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting recipes...")

    const recipes = defaultConfig.theme?.recipes ?? {}
    generateRecipeArtifacts(recipes, artifacts, flags)

    const slotRecipes = defaultConfig.theme?.slotRecipes ?? {}
    generateSlotRecipeArtifacts(slotRecipes, artifacts, flags)

    /* -----------------------------------------------------------------------------
     * Text Styles
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting text styles...")

    const textStyles = defaultConfig.theme?.textStyles ?? {}
    const textStylesContent = `
    import { defineTextStyles } from "@chakra-ui/react"
    
    export const textStyles = defineTextStyles(${JSON.stringify(textStyles, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "text-styles.ts"],
      content: textStylesContent,
    })

    /* -----------------------------------------------------------------------------
     * Layer Styles
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting layer styles...")

    const layerStyles = defaultConfig.theme?.layerStyles ?? {}
    const layerStylesContent = `
    import { defineLayerStyles } from "@chakra-ui/react"
    
    export const layerStyles = defineLayerStyles(${JSON.stringify(layerStyles, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "layer-styles.ts"],
      content: layerStylesContent,
    })

    /* -----------------------------------------------------------------------------
     * Animation Styles
     * -----------------------------------------------------------------------------*/

    p.log.info("Ejecting animation styles...")

    const animationStyles = defaultConfig.theme?.animationStyles ?? {}
    const animationStylesContent = `
    import { defineAnimationStyles } from "@chakra-ui/react"

    export const animationStyles = defineAnimationStyles(${JSON.stringify(animationStyles, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "animation-styles.ts"],
      content: animationStylesContent,
    })

    /* -----------------------------------------------------------------------------
     * Theme Config
     * -----------------------------------------------------------------------------*/

    artifacts.push({
      path: [flags.outdir, "index.ts"],
      content: `
import { createSystem, defaultBaseConfig, defineConfig, mergeConfigs } from "@chakra-ui/react"
import { animationStyles } from "./animation-styles"
import { breakpoints } from "./breakpoints"
import { globalCss } from "./global-css"
import { keyframes } from "./keyframes"
import { layerStyles } from "./layer-styles"
import { recipes } from "./recipes"
import { semanticTokens } from "./semantic-tokens"
import { slotRecipes } from "./slot-recipes"
import { textStyles } from "./text-styles"
import { tokens } from "./tokens"

const themeConfig = defineConfig({
  preflight: true,
  cssVarsPrefix: "chakra",
  cssVarsRoot: ":where(:root, :host)",
  globalCss,
  theme: {
    breakpoints,
    keyframes,
    tokens,
    semanticTokens,
    recipes,
    slotRecipes,
    textStyles,
    layerStyles,
    animationStyles,
  },
})

export const system = createSystem(defaultBaseConfig, themeConfig)
      `,
    })

    await writeArtifacts(artifacts)

    p.outro("🎉 Done!")
  })

function generateSlotRecipeArtifacts(
  slotRecipes: Record<string, any>,
  artifacts: Artifact[],
  flags: CodegenFlags,
) {
  for (const [name, recipe] of Object.entries(slotRecipes)) {
    const content = `
    import { defineSlotRecipe } from "@chakra-ui/react"

    export const ${name}SlotRecipe = defineSlotRecipe(${JSON.stringify(recipe, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "slot-recipes", `${kebabCase(name)}.ts`],
      content,
    })
  }

  artifacts.push({
    path: [flags.outdir, "slot-recipes", "index.ts"],
    content: `
        ${Object.keys(slotRecipes)
          .map(
            (name) =>
              `import { ${name}SlotRecipe } from "./${kebabCase(name)}"`,
          )
          .join("\n")}

        export const slotRecipes = {
          ${Object.keys(slotRecipes)
            .map((name) => `${name}: ${name}SlotRecipe,`)
            .join("\n")}
        }
        `,
  })
}

function generateRecipeArtifacts(
  recipes: Record<string, any>,
  artifacts: Artifact[],
  flags: CodegenFlags,
) {
  for (const [name, recipe] of Object.entries(recipes)) {
    const content = `
    import { defineRecipe } from "@chakra-ui/react"
    
    export const ${name}Recipe = defineRecipe(${JSON.stringify(recipe, null, 2)})
    `

    artifacts.push({
      path: [flags.outdir, "recipes", `${kebabCase(name)}.ts`],
      content,
    })
  }

  artifacts.push({
    path: [flags.outdir, "recipes", "index.ts"],
    content: `
        ${Object.keys(recipes)
          .map((name) => `import { ${name}Recipe } from "./${kebabCase(name)}"`)
          .join("\n")}

        export const recipes = {
          ${Object.keys(recipes)
            .map((name) => `${name}: ${name}Recipe,`)
            .join("\n")}
        }
        `,
  })
}

function generateSemanticTokenArtifacts(
  semanticTokens: Record<string, any>,
  artifacts: Artifact[],
  flags: CodegenFlags,
) {
  for (const [name, token] of Object.entries(semanticTokens)) {
    const content = `
    import { defineSemanticTokens } from "@chakra-ui/react"
    
    export const ${name} = defineSemanticTokens.${name}(${JSON.stringify(token, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "semantic-tokens", `${kebabCase(name)}.ts`],
      content,
    })
  }

  artifacts.push({
    path: [flags.outdir, "semantic-tokens", "index.ts"],
    content: `
        ${Object.keys(semanticTokens)
          .map((name) => `import { ${name} } from "./${kebabCase(name)}"`)
          .join("\n")}
        
        export const semanticTokens = {
          ${Object.keys(semanticTokens)
            .map((name) => `${name},`)
            .join("\n")}
        }
        `,
  })
}

function generateTokenArtifacts(
  tokens: Record<string, any>,
  artifacts: Artifact[],
  flags: CodegenFlags,
) {
  for (const [name, token] of Object.entries(tokens)) {
    const content = `
    import { defineTokens } from "@chakra-ui/react"
    
    export const ${name} = defineTokens.${name}(${JSON.stringify(token, null, 2)})
    `
    artifacts.push({
      path: [flags.outdir, "tokens", `${kebabCase(name)}.ts`],
      content,
    })
  }
  artifacts.push({
    path: [flags.outdir, "tokens", "index.ts"],
    content: `
        ${Object.keys(tokens)
          .map((name) => `import { ${name} } from "./${kebabCase(name)}"`)
          .join("\n")}
        
        export const tokens = {
          ${Object.keys(tokens)
            .map((name) => `${name},`)
            .join("\n")}
        }
        `,
  })
}

function writeArtifacts(artifacts: Artifact[]) {
  return Promise.all(
    artifacts.map(async (item) => {
      const filePath = join(...item.path)
      io.ensureDir(dirname(filePath))
      return writeFile(filePath, await pretty(item.content))
    }),
  )
}
