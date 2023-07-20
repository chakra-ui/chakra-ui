import "@testing-library/jest-dom/extend-expect"
import { RenderOptions } from "@testing-library/react"
import { axe, toHaveNoViolations, JestAxeConfigureOptions } from "jest-axe"
import { render } from "./render"
import { isValidElement } from "react"

expect.extend(toHaveNoViolations)

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {},
) {
  const { axeOptions, ...rest } = options
  const container = isValidElement(ui) ? render(ui, rest).container : ui
  const results = await axe(container as HTMLElement, axeOptions)
  expect(results).toHaveNoViolations()
}
