import { Children, isValidElement } from "react"

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[]
}

/**
 * Checks if children is a valid renderable value.
 *
 * @param children the children
 */
export function isNullishChildren(children: React.ReactNode) {
  return children === null || children === undefined || children === ""
}
