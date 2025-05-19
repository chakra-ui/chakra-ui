import { render } from "@chakra-ui/test-utils"
import { ThemeProvider, useStyleConfig } from "."
import { createTheme } from "./theme"
import { Icon } from "../icon"
import { FaReact } from "react-icons/fa"
import type * as StyledSystem from "@chakra-ui/styled-system"

const mockResolveStyleConfig = vi.fn().mockReturnValue(() => ({}))
let mockResolveStyleConfigEnabled = false

vi.mock("@chakra-ui/styled-system", async (importOriginal) => {
  const actual = await importOriginal<typeof StyledSystem>()
  return {
    ...actual,
    resolveStyleConfig: (config: any) => {
      if (mockResolveStyleConfigEnabled) {
        return (props: any) => mockResolveStyleConfig(props)
      }
      return actual.resolveStyleConfig(config)
    },
  }
})

describe("useStyleConfig", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockResolveStyleConfigEnabled = false
  })

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

  test("should omit react element props", async () => {
    mockResolveStyleConfigEnabled = true
    const Component = () => {
      const props = {
        size: "sm",
        children: <div>Hello</div>,
        leftIcon: <Icon as={FaReact} />,
      }
      const styles = useStyleConfig("Button", props)
      return <>{JSON.stringify(styles, null, 2)}</>
    }

    render(
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

    expect(mockResolveStyleConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        size: "sm",
      }),
    )
    expect(mockResolveStyleConfig).not.toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
      }),
    )
    expect(mockResolveStyleConfig).not.toHaveBeenCalledWith(
      expect.objectContaining({
        leftIcon: expect.anything(),
      }),
    )
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
})
