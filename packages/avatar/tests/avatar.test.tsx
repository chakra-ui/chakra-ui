import * as React from "react"
import { render, testA11y, waitFor } from "@chakra-ui/test-utils"
import { Avatar, AvatarBadge } from "../src"

const DELAY = 0
const LOAD_IMAGE = "load"
const ERROR_IMAGE = "error"
const orignalImage = window.Image

const mockImage = (loadState: "load" | "error") => {
  jest.useFakeTimers()
  ;(window.Image as unknown) = class {
    onload: () => void = () => {}
    onerror: () => void = () => {}
    src: string = ""
    constructor() {
      setTimeout(() => {
        switch (loadState) {
          case LOAD_IMAGE:
            this.onload()
            break
          case ERROR_IMAGE:
            this.onerror()
            break
          default:
            break
        }
      }, DELAY)
      return this
    }
  }
}

afterEach(() => {
  jest.useRealTimers()
})
afterAll(() => {
  window.Image = orignalImage
})

it("passes a11y test", async () => {
  await testA11y(<Avatar />, {
    axeOptions: {
      rules: {
        "svg-img-alt": { enabled: false },
      },
    },
  })
})

it("passes a11y test with AvatarBadge", async () => {
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

test("renders an image", async () => {
  mockImage(LOAD_IMAGE)
  const src = "https://bit.ly/dan-abramov"
  const name = "Dan Abramov"
  const { container } = render(<Avatar src={src} name={name} />)

  await waitFor(() => {
    jest.advanceTimersByTime(DELAY)
  })

  const img = container.querySelector("img")
  expect(img).toHaveAttribute("src", src)
  expect(img).toHaveAttribute("alt", name)
})

test("fires onError if image fails to load", async () => {
  mockImage(ERROR_IMAGE)
  const src = "https://bit.ly/dan-abramov"
  const name = "Dan Abramov"
  const onErrorFn = jest.fn()
  render(<Avatar src={src} name={name} onError={onErrorFn} />)

  await waitFor(() => {
    jest.advanceTimersByTime(DELAY)
  })

  expect(onErrorFn).toHaveBeenCalledTimes(1)
})

test("renders a name avatar if no src", () => {
  const name = "Dan Abramov"
  const { getByLabelText } = render(<Avatar name="Dan Abramov" />)

  const img = getByLabelText(name)
  expect(img).toHaveTextContent("DA")
})

test("renders a default avatar if no name or src", () => {
  const { getByRole } = render(<Avatar />)
  getByRole("img")
})
