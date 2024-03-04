import { act, mocks, render, testA11y } from "@chakra-ui/test-utils"
import { Avatar, AvatarBadge } from "../src/components/avatar"

const AvatarComp = (props: Avatar.RootProps) => {
  return (
    <Avatar.Root {...props}>
      <Avatar.Image />
      <Avatar.Fallback />
      {props.children}
    </Avatar.Root>
  )
}

describe("accessibility", () => {
  test("passes a11y test", async () => {
    await testA11y(<AvatarComp />, {
      axeOptions: {
        rules: {
          "svg-img-alt": { enabled: false },
        },
      },
    })
  })

  test("passes a11y test with AvatarBadge", async () => {
    await testA11y(
      <AvatarComp>
        <AvatarBadge />
      </AvatarComp>,
      {
        axeOptions: {
          rules: {
            "svg-img-alt": { enabled: false },
          },
        },
      },
    )
  })
})

describe("fallback + loading strategy", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    mocks.image().restore()
  })

  test("renders an image", async () => {
    const mock = mocks.image()
    mock.simulate("loaded")
    const tools = render(
      <AvatarComp src="https://bit.ly/dan-abramov" name="Dan Abramov" />,
    )

    act(() => {
      vi.runAllTimers()
    })

    const img = tools.getByAltText("Dan Abramov")
    expect(img).toBeInTheDocument()
  })

  test("fires onError if image fails to load", async () => {
    const mock = mocks.image()
    mock.simulate("error")

    const src = "https://bit.ly/dan-abramov"
    const name = "Dan Abramov"
    const onErrorFn = vi.fn()
    render(<AvatarComp src={src} name={name} onError={onErrorFn} />)

    act(() => {
      vi.runAllTimers()
    })

    expect(onErrorFn).toHaveBeenCalledTimes(1)
  })

  test("renders a name avatar if no src", () => {
    const tools = render(<AvatarComp name="Dan Abramov" />)
    const intials = tools.queryByText("DA")
    expect(intials).toBeInTheDocument()
  })

  test("renders a single character if only one name is passed", () => {
    const tools = render(<AvatarComp name="Dan" />)
    const intials = tools.queryByText("D")
    expect(intials).toBeInTheDocument()
  })

  test("renders the first characters of the first and last name when more than two names are passed", () => {
    const tools = render(<AvatarComp name="Dan React Abramov" />)
    const intials = tools.queryByText("DA")
    expect(intials).toBeInTheDocument()
  })

  test("renders a name avatar if name has leading space", () => {
    const tools = render(<AvatarComp name=" Dan Abramov" />)
    const intials = tools.queryByText("DA")
    expect(intials).toBeInTheDocument()
  })

  test("renders a name avatar if name has trailing space", () => {
    const tools = render(<AvatarComp name="Dan Abramov " />)
    const intials = tools.queryByText("DA")
    expect(intials).toBeInTheDocument()
  })

  test("renders a name avatar if name has leading and trailing space", () => {
    const tools = render(<AvatarComp name=" Dan Abramov " />)
    const intials = tools.queryByText("DA")
    expect(intials).toBeInTheDocument()
  })

  test("renders a default avatar if no name or src", () => {
    const tools = render(<AvatarComp />)
    expect(tools.getByRole("img")).toHaveClass("chakra-avatar__svg")
  })
})
