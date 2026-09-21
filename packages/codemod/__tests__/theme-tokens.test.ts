import { describe, expect, it } from "vitest"
import transform from "../src/transforms/theme/theme-tokens"
import { applyTransform, applyTransformFiles } from "./test-utils"

describe("theme-tokens codemod", () => {
  describe("textStyles transformations", () => {
    it("should wrap textStyles in value property", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  textStyles: {
    body: {
      fontFamily: 'Inter',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '24',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            textStyles: {
              body: {
                value: {
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '24',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should preserve description and wrap CSS in value", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  textStyles: {
    heading: {
      description: 'Heading text style',
      fontFamily: 'Georgia',
      fontWeight: 'bold',
      fontSize: '24px',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            textStyles: {
              heading: {
                description: 'Heading text style',
                value: {
                  fontFamily: 'Georgia',
                  fontWeight: 'bold',
                  fontSize: '24px',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should handle multiple textStyles", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  textStyles: {
    body: {
      fontFamily: 'Inter',
      fontSize: '16px',
    },
    heading: {
      fontFamily: 'Georgia',
      fontSize: '24px',
    },
    caption: {
      fontFamily: 'Inter',
      fontSize: '12px',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            textStyles: {
              body: {
                value: {
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
              },
              heading: {
                value: {
                  fontFamily: 'Georgia',
                  fontSize: '24px',
                },
              },
              caption: {
                value: {
                  fontFamily: 'Inter',
                  fontSize: '12px',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should not double-wrap if value already exists", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  textStyles: {
    body: {
      value: {
        fontFamily: 'Inter',
        fontSize: '16px',
      },
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            textStyles: {
              body: {
                value: {
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
              },
            },
          },
        })
        "
      `)
    })
  })

  describe("layerStyles transformations", () => {
    it("should wrap layerStyles in value property", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  layerStyles: {
    container: {
      background: 'gray.50',
      border: '2px solid',
      borderColor: 'gray.500',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            layerStyles: {
              container: {
                value: {
                  background: 'gray.50',
                  border: '2px solid',
                  borderColor: 'gray.500',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should preserve description and wrap CSS in value", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  layerStyles: {
    card: {
      description: 'Card container style',
      bg: 'white',
      shadow: 'md',
      borderRadius: 'lg',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            layerStyles: {
              card: {
                description: 'Card container style',
                value: {
                  bg: 'white',
                  shadow: 'md',
                  borderRadius: 'lg',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should handle multiple layerStyles", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  layerStyles: {
    base: {
      bg: 'white',
      color: 'gray.800',
    },
    selected: {
      bg: 'blue.500',
      color: 'white',
    },
    disabled: {
      bg: 'gray.100',
      color: 'gray.400',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            layerStyles: {
              base: {
                value: {
                  bg: 'white',
                  color: 'gray.800',
                },
              },
              selected: {
                value: {
                  bg: 'blue.500',
                  color: 'white',
                },
              },
              disabled: {
                value: {
                  bg: 'gray.100',
                  color: 'gray.400',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should not double-wrap if value already exists", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  layerStyles: {
    container: {
      value: {
        bg: 'gray.50',
        border: '1px solid',
      },
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            layerStyles: {
              container: {
                value: {
                  bg: 'gray.50',
                  border: '1px solid',
                },
              },
            },
          },
        })
        "
      `)
    })
  })

  describe("combined transformations", () => {
    it("should transform both textStyles and layerStyles together", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  textStyles: {
    body: {
      fontFamily: 'Inter',
      fontSize: '16px',
    },
  },
  layerStyles: {
    card: {
      bg: 'white',
      shadow: 'md',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            textStyles: {
              body: {
                value: {
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
              },
            },
            layerStyles: {
              card: {
                value: {
                  bg: 'white',
                  shadow: 'md',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should transform textStyles, layerStyles, and regular tokens together", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      500: '#3182ce',
    },
  },
  textStyles: {
    body: {
      description: 'Body text',
      fontFamily: 'Inter',
      fontSize: '16px',
    },
  },
  layerStyles: {
    card: {
      description: 'Card style',
      bg: 'white',
      shadow: 'md',
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            tokens: {
              colors: {
                brand: {
                  500: {
                    value: '#3182ce',
                  },
                },
              },
            },
            textStyles: {
              body: {
                description: 'Body text',
                value: {
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
              },
            },
            layerStyles: {
              card: {
                description: 'Card style',
                value: {
                  bg: 'white',
                  shadow: 'md',
                },
              },
            },
          },
        })
        "
      `)
    })

    it("should handle complex theme with all features", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: '#3182ce',
  },
  textStyles: {
    heading: {
      description: 'Heading styles',
      fontFamily: 'Georgia',
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Inter',
      fontSize: '16px',
    },
  },
  layerStyles: {
    card: {
      bg: 'white',
      shadow: 'md',
    },
    selected: {
      description: 'Selected state',
      bg: 'blue.50',
      borderColor: 'blue.500',
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'blue.500',
        _dark: 'blue.300',
      },
    },
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            tokens: {
              colors: {
                primary: {
                  value: '#3182ce',
                },
              },
            },
            semanticTokens: {
              colors: {
                primary: {
                  value: {
                    base: 'blue.500',
                    _dark: 'blue.300',
                  },
                },
              },
            },
            textStyles: {
              heading: {
                description: 'Heading styles',
                value: {
                  fontFamily: 'Georgia',
                  fontWeight: 'bold',
                },
              },
              body: {
                value: {
                  fontFamily: 'Inter',
                  fontSize: '16px',
                },
              },
            },
            layerStyles: {
              card: {
                value: {
                  bg: 'white',
                  shadow: 'md',
                },
              },
              selected: {
                description: 'Selected state',
                value: {
                  bg: 'blue.50',
                  borderColor: 'blue.500',
                },
              },
            },
          },
        })
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should handle empty textStyles", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  textStyles: {},
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            textStyles: {},
          },
        })
        "
      `)
    })

    it("should handle empty layerStyles", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  layerStyles: {},
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            layerStyles: {},
          },
        })
        "
      `)
    })

    it("should handle theme without textStyles or layerStyles", async () => {
      const input = `
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: '#3182ce',
  },
})
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { createSystem, defaultConfig } from '@chakra-ui/react'

        const system = createSystem(defaultConfig, {
          theme: {
            tokens: {
              colors: {
                brand: {
                  value: '#3182ce',
                },
              },
            },
          },
        })
        "
      `)
    })
  })

  describe("cross-file tokens", () => {
    it("rewrites imported token files to the { value } shape", async () => {
      const files = {
        "colors.ts": `export const colors = {
  brand: {
    50: '#e6f2ff',
    500: '#0066cc',
  },
}
`,
        "spacing.ts": `export const spacing = {
  sm: '8px',
  md: '16px',
}
`,
        "theme.ts": `import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { spacing } from './spacing'

const theme = extendTheme({
  colors,
  space: spacing,
})

export default theme
`,
      }

      const out = await applyTransformFiles(transform, files, "theme.ts")

      // sibling token files are statically rewritten to { value }
      expect(out["colors.ts"]).toContain("value: '#0066cc'")
      expect(out["colors.ts"]).toContain("value: '#e6f2ff'")
      expect(out["spacing.ts"]).toContain("value: '8px'")

      // the theme keeps its references; no runtime helper is injected
      expect(out["theme.ts"]).not.toContain("toTokens")
      expect(out["theme.ts"]).toContain("createSystem(defaultConfig")
      expect(out["theme.ts"]).toContain("tokens: {")

      // theme -> system rename reaches the default export
      expect(out["theme.ts"]).toContain("export default system")
      expect(out["theme.ts"]).not.toContain("export default theme")
    })

    it("warns and skips when a token import can't be resolved", async () => {
      const files = {
        "theme.ts": `import { extendTheme } from '@chakra-ui/react'
import { colors } from 'some-external-pkg'

const theme = extendTheme({
  colors,
})

export default theme
`,
      }

      // Should not throw; the unresolved import is left untouched.
      const out = await applyTransformFiles(transform, files, "theme.ts")
      expect(out["theme.ts"]).toContain("createSystem(defaultConfig")
      expect(out["theme.ts"]).not.toContain("toTokens")
    })
  })
})
