import { z } from "zod"
import { tokenCategories } from "../lib/system.js"
import type { Tool } from "../lib/types.js"

interface CustomizationScenario {
  usage?: string
  description: string
}

const CUSTOMIZATION_SCENARIOS: Record<string, CustomizationScenario> = {
  animations: {
    description: `
    const config = defineConfig({
        theme: {
            keyframes: {
            // ... keyframes from above
            },
            tokens: {
                animations: {
                    shakeX: { value: "shakeX 1s ease-in-out infinite" },
                },
            },
        },
    })
`,
  },
  breakpoints: {
    description: `
    const config = defineConfig({
    theme: {
        breakpoints: {
        tablet: "992px",
        desktop: "1200px",
        wide: "1400px",
        },
    },
    })
`,
  },
  colors: {
    description: `
    const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#e6f2ff" },
          200: { value: "#bfdeff" },
          300: { value: "#99caff" },
          // ...
          950: { value: "#001a33" },
        },
      },
    },
  },
})
    `,
  },
  conditions: {
    description: `
    const config = defineConfig({
        conditions: {
            off: "&:is([data-state=off])",
            on: "&:is([data-state=on])",
        },
    })
    `,
    usage: `
    import { Box } from "@chakra-ui/react"

    <Box data-state="off" _off={{ bg: "red.500" }} />
    <Box data-state="on" _on={{ bg: "green.500" }} />
    `,
  },
  cursor: {
    description: `
    import { createSystem, defaultConfig } from "@chakra-ui/react"

    export const system = createSystem(defaultConfig, {
    theme: {
            tokens: {
                cursor: {
                    button: { value: "pointer" },
                },
            },
        },
    })
    `,
  },
  sizes: {
    description: `
    const config = defineConfig({
    theme: {
            tokens: {
            sizes: {
                "1/7": { value: "14.285%" },
                "2/7": { value: "28.571%" },
                "3/7": { value: "42.857%" },
            },
            },
        },
    })
    `,
  },
  spacing: {
    description: `
    const config = defineConfig({
    theme: {
        tokens: {
        spacing: {
            "128": { value: "32rem" },
            "144": { value: "36rem" },
        },
        },
    },
    })
    `,
  },
  layerStyles: {
    description: `
    const config = defineConfig({
      theme: {
        layerStyles: {
          CUSTOM: {
            value: {
              background: "gray.200",
              borderRadius: "md",
              padding: "4",
            },
          },
        },
      },
    })
    `,
  },
  textStyles: {
    description: `
    const config = defineConfig({
      theme: {
        textStyles: {
          CUSTOM: {
            value: {
              fontSize: "16px",
              fontWeight: "bold",
              lineHeight: "1.5",
            },
          },
        },
      },
    })
    `,
  },
}

const generateTemplate = (content: string) => {
  return `
    import { createSystem, defaultConfig } from "@chakra-ui/react"

    ${content}

    export const system = createSystem(defaultConfig, config)
`
}

const fallbackTemplate = (category: string) => {
  return generateTemplate(`
    const config = defineConfig({
    theme: {
        tokens: {
        ${category}: {
            "Token_Key": { value: "Token_Value" },
        },
        },
    },
    })
    `)
}

const themeCustomizationCategory = Array.from(
  new Set([
    ...tokenCategories,
    ...Object.keys(CUSTOMIZATION_SCENARIOS),
    "conditions",
    "globalCss",
  ]),
)

export const themeCustomizationTool: Tool = {
  name: "theme_customization",
  description:
    "Use this tool to create custom design tokens for your Chakra UI theme. You can define new tokens, modify existing ones, and apply them to your components.",
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        category: z
          .enum(themeCustomizationCategory as [string, ...string[]])
          .describe("The category of the token to customize"),
      },
      async ({ category }) => {
        const customizationInfo = Reflect.get(CUSTOMIZATION_SCENARIOS, category)

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                usage: customizationInfo?.usage,
                description: customizationInfo
                  ? generateTemplate(customizationInfo.description)
                  : fallbackTemplate(category),
              }),
            },
            category === "colors"
              ? {
                  type: "text",
                  text: `
                    For new colors defined in the theme, YOU MUST create these matching semantic tokens to ensure consistency.
                    solid, contrast, fg, muted, subtle, emphasized, focusRing. Value can be a string or an object with _light and _dark properties.

                    const config = defineConfig({
                    theme: {
                        tokens: {
                        colors: {
                            brand: {
                            // ...
                            },
                        },
                        },
                        semanticTokens: {
                        colors: {
                            brand: {
                            solid: { value: "{colors.brand.500}" },
                            contrast: { value: "{colors.brand.100}" },
                            fg: { value: {_light:"{colors.brand.700}",_dark:"{colors.brand.600}"} },
                            muted: { value: "{colors.brand.100}" },
                            subtle: { value: "{colors.brand.200}" },
                            emphasized: { value: "{colors.brand.300}" },
                            focusRing: { value: "{colors.brand.500}" },
                            },
                        },
                        },
                    },
                    })
                  `,
                }
              : { type: "text", text: "" },
            {
              type: "text",
              text: `
              To get proper autocompletion, YOU MUST run the following command:
              npx -y @chakra-ui/cli typegen /PATH_TO_YOUR_THEME.{ts,js}
              `,
            },
          ],
        }
      },
    )
  },
}
