import { mocks, render, testA11y, act } from "@chakra-ui/test-utils"
import * as React from "react"
import { Avatar, AvatarBadge } from "../src"

describe("accessibility", () => {
  test("passes a11y test", async () => {
    await testA11y(<Avatar />, {
      axeOptions: {
        rules: {
          "svg-img-alt": { enabled: false },
        },
      },
    })
  })

  test("passes a11y test with AvatarBadge", async () => {
    await testA11y(
      <Avatar>
        <AvatarBadge />
      </Avatar>,
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
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    mocks.image().restore()
  })

  test("renders an image", async () => {
    const mock = mocks.image()
    mock.simulate("loaded")
    const tools = render(
      <Avatar src="https://bit.ly/dan-abramov" name="Dan Abramov" />,
    )

    act(() => {
      jest.runAllTimers()
    })

    const img = tools.getByAltText("Dan Abramov")
    expect(img).toBeInTheDocument()
  })

  test("fires onError if image fails to load", async () => {
    const mock = mocks.image()
    mock.simulate("error")

    const src = "https://bit.ly/dan-abramov"
    const name = "Dan Abramov"
    const onErrorFn = jest.fn()
    render(<Avatar src={src} name={name} onError={onErrorFn} />)

    act(() => {
      jest.runAllTimers()
    })

    expect(onErrorFn).toHaveBeenCalledTimes(1)
  })

  test("renders a name avatar if no src", () => {
    const tools = render(<Avatar name="Dan Abramov" />)
    const img = tools.queryByText("DA")
    expect(img).toBeInTheDocument()
  })

  test("renders a default avatar if no name or src", () => {
    const tools = render(<Avatar />)
    expect(tools.getByRole("img")).toHaveClass("chakra-avatar__svg")
  })
})
