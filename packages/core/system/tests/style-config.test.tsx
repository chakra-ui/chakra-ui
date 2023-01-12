import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { ThemeProvider, useStyleConfig } from "../src"
import { createTheme } from "./theme"

test("should resolve styles in theme", async () => {
  const Component = () => {
    const styles = useStyleConfig("Button", { size: "sm" })
    return <>{JSON.stringify(styles, null, 2)}</>
  }

  const { asFragment } = render(
    <ThemeProvider
      theme={createTheme({
        components: {
          Button: {
            baseStyle: {
              px: 4,
              py: 8,
            },
            sizes: {
              sm: {
                fontSize: 4,
              },
              md: {
                fontSize: 8,
              },
            },
          },
        },
      })}
    >
      <Component />
    </ThemeProvider>,
    {
      withChakraProvider: false,
    },
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      {
      "px": 4,
      "py": 8,
      "fontSize": 4
    }
    </DocumentFragment>
  `)
})

test("should resolve multipart styles in theme", async () => {
  const Component = () => {
    const props = {
      size: "sm",
      variant: "outline",
    }
    const styles = useStyleConfig("Tabs", props)
    return <>{JSON.stringify(styles, null, 2)}</>
  }

  const { asFragment } = render(
    <ThemeProvider
      theme={createTheme({
        components: {
          Tabs: {
            parts: ["tablist", "tabpanel", "tab"],
            defaultProps: { variant: "solid" },
            baseStyle: {
              tab: {
                px: 4,
                py: 3,
                color: "red.500",
              },
            },
            sizes: {
              sm: {
                tab: {
                  fontSize: 5,
                },
                tablist: {
                  p: 4,
                },
              },
            },
            variants: {
              outline: {
                tablist: {
                  border: "1px solid",
                },
              },
              solid: {
                tab: {
                  bg: "red.300",
                },
              },
            },
          },
        },
      })}
    >
      <Component />
    </ThemeProvider>,
    {
      withChakraProvider: false,
    },
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      {
      "tab": {
        "px": 4,
        "py": 3,
        "color": "red.500",
        "fontSize": 5
      },
      "tablist": {
        "p": 4,
        "border": "1px solid"
      }
    }
    </DocumentFragment>
  `)
})
