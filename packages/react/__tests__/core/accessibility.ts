import "@testing-library/jest-dom/vitest"
import type { RenderOptions } from "@testing-library/react"
import { isValidElement } from "react"
import { render } from "./render"

type Opts = RenderOptions & {
  axeOptions?: any
}

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: Opts = {},
) {
  const { axe } = await import("vitest-axe")
  const { axeOptions, ...rest } = options

  const container = isValidElement(ui) ? render(ui, rest).container : ui
  const results = await axe(container as any, axeOptions)

  // @ts-ignore
  expect(results).toHaveNoViolations()
}
