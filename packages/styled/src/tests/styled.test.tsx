import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { chakra } from ".."

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
