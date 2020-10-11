import { RtlRender, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { ThemeProvider, useStyleConfig, useProps } from "../src"

test("should resolve styles in theme", async () => {
  const Component = () => {
    const styles = useStyleConfig("Button", { size: "sm" })
    return <>{JSON.stringify(styles, null, 2)}</>
  }

  const { asFragment } = RtlRender(
    <ThemeProvider
      theme={{
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
      }}
    >
      <Component />
    </ThemeProvider>,
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

  const { asFragment } = RtlRender(
    <ThemeProvider
      theme={{
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
      }}
    >
      <Component />
    </ThemeProvider>,
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

test("should resolve props and styles", async () => {
  const Component = (props: any) => {
    const res = useProps("Tabs", props, true)
    return (
      <>
        {JSON.stringify(
          res,
          function (k, v) {
            return typeof v === "function" ? "[Function]" : v
          },
          2,
        )}
      </>
    )
  }

  const { asFragment } = render(
    <Component
      size="sm"
      variant="outline"
      aria-label="testing"
      tabIndex={1}
      styleConfig={{
        baseStyle: {
          fontFamily: "Inter",
          color: "red.400",
        },
        sizes: {
          sm: {
            fontSize: 12,
            color: "red.500",
          },
        },
        variants: {
          outline: {
            border: "2px solid blue.400",
          },
          solid: {
            bg: "blue.400",
          },
        },
        defaultProps: {
          focusBorderColor: "red.400",
          variant: "solid",
        },
      }}
      onClick={() => {
        console.log("hello")
      }}
    />,
  )
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      {
      "styles": {
        "fontFamily": "Inter",
        "color": "red.500",
        "fontSize": 12,
        "border": "2px solid blue.400"
      },
      "props": {
        "focusBorderColor": "red.400",
        "aria-label": "testing",
        "tabIndex": 1,
        "onClick": "[Function]"
      }
    }
    </DocumentFragment>
  `)
})
