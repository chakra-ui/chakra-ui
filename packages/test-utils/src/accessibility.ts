import "@testing-library/jest-dom"
import { RenderOptions } from "@testing-library/react"
import * as React from "react"
import { render } from "./render"

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: any } = {},
) {
  const { axe } = await import("vitest-axe")
  const { axeOptions, ...rest } = options
  const container = React.isValidElement(ui) ? render(ui, rest).container : ui
  const results = await axe(container as HTMLElement, axeOptions)
  // @ts-ignore
  expect(results).toHaveNoViolations()
}
