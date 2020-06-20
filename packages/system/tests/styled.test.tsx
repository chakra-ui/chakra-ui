/**@jsx jsx */
import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { chakra, jsx, ThemeProvider } from "../src"
import theme from "./theme.sample"

test("as jsx element", () => {
  const Div = chakra("div")
  const tools = render(<Div as="span">a</Div>)

  expect(tools.getByText("a")).toMatchInlineSnapshot(`
    <span>
      a
    </span>
  `)
})

test("as component", () => {
  type Props = {
    isBig?: boolean
  }
  const Konoha = ({ isBig, ...props }: Props) => (
    <div data-size={isBig ? "big" : "small"} {...props} />
  )

  const Div = chakra("div")

  const tools = render(
    <Div as={Konoha} isBig>
      a
    </Div>,
  )

  expect(tools.getByText("a")).toMatchInlineSnapshot(`
    <div
      data-size="big"
    >
      a
    </div>
  `)
})

test("chakra elements - renders currently", () => {
  const tools = render(<chakra.div>Welcome</chakra.div>)

  expect(tools.getByText("Welcome")).toMatchInlineSnapshot(`
    <div>
      Welcome
    </div>
  `)
})

test("chakra elements - renders with style props", () => {
  const tools = render(<chakra.div marginTop="40px">Welcome</chakra.div>)

  expect(tools.asFragment()).toMatchSnapshot()

  expect(tools.getByText("Welcome")).toHaveStyle(`margin-top: 40px`)
})

test("chakra function - renders currently", () => {
  const Button = chakra("button")
  const tools = render(<Button>Click Me</Button>)

  expect(tools.getByText("Click Me")).toMatchInlineSnapshot(`
    <button>
      Click Me
    </button>
  `)

  tools.rerender(
    <Button
      bg="blue.600"
      color="white"
      _hover={{ bg: "blue.700" }}
      _active={{ bg: "blue.800" }}
    >
      Click me
    </Button>,
  )

  expect(tools.asFragment()).toMatchSnapshot()
})

test("it allows pass through props", () => {
  const Image = chakra("img")
  const tools = render(<Image data-testid="img" htmlWidth="60px" />)

  expect(tools.asFragment()).toMatchSnapshot()
})

test("it renders with base style", () => {
  const Div = chakra("div", {
    baseStyle: {
      padding: "40px",
      margin: "30px",
    },
  })
  const tools = render(<Div>Hey!</Div>)

  expect(tools.asFragment()).toMatchSnapshot()

  expect(tools.getByText("Hey!")).toHaveStyle(`padding: 40px; margin: 30px`)
})

test("it renders component using theme key", () => {
  const Badge = chakra("span", {
    themeKey: "Badge",
  })

  const tools = render(
    <ThemeProvider theme={theme}>
      <Badge>Badge</Badge>
    </ThemeProvider>,
  )

  expect(tools.asFragment()).toMatchSnapshot()
})

test("attrs option works correctly", () => {
  const Button = chakra("button", {
    themeKey: "Button",
    attrs: {
      type: "button",
    },
  })

  const tools = render(
    <ThemeProvider theme={theme}>
      <Button>Click</Button>
    </ThemeProvider>,
  )

  expect(tools.asFragment()).toMatchSnapshot()

  expect(tools.getByText("Click")).toHaveAttribute("type", "button")
})

test("it forwards ref to element correctly", () => {
  const Button = chakra("button")

  const Setup = () => {
    const ref = React.useRef<HTMLButtonElement>(null)

    React.useEffect(() => {
      ref.current?.focus()
    }, [])

    return <Button ref={ref}>Click</Button>
  }

  const tools = render(<Setup />)

  expect(tools.getByText("Click")).toHaveFocus()
})

test("__css prop works on jsx element", () => {
  const tools = render(<button __css={{ margin: "40px" }}>Click</button>)

  expect(tools.asFragment()).toMatchSnapshot()

  expect(tools.getByText("Click").getAttribute("class")).toContain("css")
})

test.todo("css prop works correctly")

test("apply property in theme works correctly", () => {
  /**
   * Note: check theme.sample.ts to see the theme. it looks like this.
   *
   * Code: {
   *  baseStyle: {
   *    apply: "components.Badge.baseStyle"
   *  }
   * }
   */
  const Code = chakra("code", { themeKey: "Code" })
  const tools = render(<Code>code</Code>)
  expect(tools.asFragment()).toMatchSnapshot()
  expect(tools.getByText("code").getAttribute("class")).toContain("css")
})
