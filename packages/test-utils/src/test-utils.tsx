import { ChakraProvider } from "@chakra-ui/core"
import "@testing-library/jest-dom/extend-expect"
import {
  render as RtlRender,
  RenderOptions,
  fireEvent,
  RenderResult,
} from "@testing-library/react"
import * as React from "react"
import { toHaveNoViolations, axe } from "jest-axe"
import serializer from "jest-emotion"
import { RunOptions } from "axe-core"

expect.addSnapshotSerializer(serializer)
expect.extend(toHaveNoViolations)

type UI = Parameters<typeof RtlRender>[0]

// UI-less passthrough fallback to prevent using conditional logic in render
function ChildrenPassthrough({ children }: { children: React.ReactElement }) {
  return children
}

export interface TestOptions extends Omit<RenderOptions, "wrapper"> {
  /**
   * optional additional wrapper, e.g. Context
   *
   * @example
   * ```ts
   * // single wrapper
   * render(<MyConponent />, {
   *  wrapper: MyContext
   * });
   *
   * // multiple wrapper
   * render(<MyConponent />, {
   *  wrapper: ({ children }) => (
   *    <ContextA>
   *      <ContextB>
   *        {children}
   *      <ContextB />
   *    <ContextA />
   *  )
   * });
   *
   * ```
   */
  wrapper?: typeof ChildrenPassthrough
}

/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */
export const render = (
  ui: UI,
  { wrapper: Wrapper = ChildrenPassthrough, ...options }: TestOptions = {},
): RenderResult => {
  return RtlRender(
    <ChakraProvider resetCSS>
      <Wrapper>{ui}</Wrapper>
    </ChakraProvider>,
    options,
  )
}

export { RtlRender }
export { axe }

export * from "@testing-library/react"

export {
  act as invoke,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks"

export { default as userEvent } from "@testing-library/user-event"

export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, { key: "Escape", keyCode: 27 })

type TestA11YOptions = TestOptions & { axeOptions?: RunOptions }

/**
 * Validates against common a11y mistakes.
 *
 * Wrapper for jest-axe
 *
 * @example
 * ```jsx
 * it('passes a11y test', async () => {
 *  await testA11Y(<MyComponent />, options);
 * });
 *
 * // sometimes we need to perform interactions first to render conditional UI
 * it('passes a11y test when open', async () => {
 *  const { container } = render(<MyComponent />, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 * ```
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
export const testA11y = async (
  ui: UI | HTMLElement,
  { axeOptions, ...options }: TestA11YOptions = {},
) => {
  const container = React.isValidElement(ui)
    ? render(ui, options).container
    : ui

  const results = await axe(container, axeOptions)

  expect(results).toHaveNoViolations()
}
