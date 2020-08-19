import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { createIcon } from "../src"

const chakraIconPath = [
  <title key="1">Chakra Logo</title>,
  <rect
    width="257"
    height="257"
    fill="url(#paint0_linear)"
    rx="128.5"
    key="2"
  />,
  <path
    fill="#fff"
    d="M69.56 133.99l87.59-87c1.64-1.62 4.27.36 3.17 2.38l-32.6 59.76a2 2 0 001.75 2.95h56.34a2 2 0 011.36 3.47l-98.72 92.14c-1.78 1.65-4.41-.68-2.99-2.64l46.74-64.47a2 2 0 00-1.62-3.18H70.97a2 2 0 01-1.41-3.41z"
    key="3"
  />,
  <defs key="4">
    <linearGradient
      id="paint0_linear"
      x1="128.5"
      x2="128.5"
      y2="257"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#7BCBD4" />
      <stop offset="1" stopColor="#29C6B7" />
    </linearGradient>
  </defs>,
]

it("sets default viewBox", () => {
  const Icon = createIcon({
    path: chakraIconPath,
  })

  const { container } = render(<Icon />)

  expect(container.querySelector("svg")).toHaveAttribute("viewBox")
})

it("forwards d attribute onto a path element", () => {
  const d =
    "M69.56 133.99l87.59-87c1.64-1.62 4.27.36 3.17 2.38l-32.6 59.76a2 2 0 001.75 2.95h56.34a2 2 0 011.36 3.47l-98.72 92.14c-1.78 1.65-4.41-.68-2.99-2.64l46.74-64.47a2 2 0 00-1.62-3.18H70.97a2 2 0 01-1.41-3.41z"

  const Icon = createIcon({
    d,
  })

  const { asFragment, container } = render(<Icon />)

  expect(asFragment()).toMatchSnapshot()

  expect(container.querySelector("path")).toHaveAttribute("d", d)
})

it("accepts a single path", () => {
  const d =
    "M69.56 133.99l87.59-87c1.64-1.62 4.27.36 3.17 2.38l-32.6 59.76a2 2 0 001.75 2.95h56.34a2 2 0 011.36 3.47l-98.72 92.14c-1.78 1.65-4.41-.68-2.99-2.64l46.74-64.47a2 2 0 00-1.62-3.18H70.97a2 2 0 01-1.41-3.41z"
  const fill = "#fff"

  const Icon = createIcon({
    path: <path fill={fill} d={d} />,
  })

  const { asFragment, container } = render(<Icon />)

  expect(asFragment()).toMatchSnapshot()

  expect(container.querySelector("svg")!.children).toHaveLength(1)
  expect(container.querySelector("path")).toHaveAttribute("d", d)
  expect(container.querySelector("path")).toHaveAttribute("fill", fill)
})

it("accepts multiple paths", () => {
  const Icon = createIcon({
    path: chakraIconPath,
  })

  const { asFragment, container } = render(<Icon />)

  expect(asFragment()).toMatchSnapshot()

  expect(container.querySelector("svg")!.children).toHaveLength(
    chakraIconPath.length,
  )
})

it("forwards default props", () => {
  const Icon = createIcon({
    path: chakraIconPath,
    defaultProps: {
      fill: "none",
    },
  })

  const { asFragment } = render(<Icon />)

  expect(asFragment()).toMatchSnapshot()

  // cant check for the svg element to have some attribute as its hidden
  // away in emotion internals creating a stylesheet and .getComputedStyle
  // is not supported in jest-dom
})

it("forwards displayName", () => {
  const displayName = "dummy-display-name"

  const Icon = createIcon({
    path: chakraIconPath,
    displayName,
  })

  expect(Icon.displayName).toBe(displayName)
})
