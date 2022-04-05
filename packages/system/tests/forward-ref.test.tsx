/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { chakra, forwardRef } from ".."

/**
 * These tests should fail while type checking
 * if the typings for `ChakraComponent` change
 * and create a type regression
 */
describe("`forward-ref` prop typings", () => {
  it("should not allow props outside the prop interface", () => {
    const Button = forwardRef<{ allowedProp?: string }, "button">(
      (props, ref) => <chakra.button {...props} ref={ref} />,
    )

    // @ts-expect-error `test` prop should not be allowed.
    const renderedCustomCompWithBadProp = <Button test />
    const renderedCustomCompWithRequired = (
      <Button allowedProp="allowed" type="submit" />
    )

    // make jest happy
    expect(true).toBe(true)
  })
})
