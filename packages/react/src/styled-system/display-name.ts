import type { ComponentType, ElementType } from "react"

/**
 * `displayName` or `name` from a component type. For intrinsic string tags (e.g. `"div"`),
 * returns `undefined` — those do not carry a component name.
 */
export function getElementTypeDisplayName(
  Component: ElementType,
): string | undefined {
  if (typeof Component === "string") return undefined
  return (
    (Component as ComponentType<any>).displayName ||
    (Component as { name?: string }).name
  )
}

export function upperFirst(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** displayName for slot-recipe parts, e.g. `Accordion` + `root` → `AccordionRoot`. */
export function inferSlotRecipeComponentDisplayName(
  contextName: string,
  slot: string,
): string {
  return contextName + upperFirst(slot)
}

/** displayName for `withRootProvider` wrappers, e.g. `Dialog` + `Root` → `DialogRoot`. */
export function inferRootProviderDisplayName(
  contextName: string,
  innerDisplayNameOrName: string | undefined,
): string | undefined {
  if (!innerDisplayNameOrName) return undefined
  return contextName + upperFirst(innerDisplayNameOrName)
}
