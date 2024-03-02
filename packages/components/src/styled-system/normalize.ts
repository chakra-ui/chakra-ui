import { Dict, isArray, walkObject } from "@chakra-ui/utils"
import { SystemContext } from "./types"

function toResponsiveObject(values: any[], breakpoints: string[]) {
  return values.reduce((acc, current, index) => {
    const key = breakpoints[index]
    if (current != null) acc[key] = current
    return acc
  }, {})
}

export function createNormalizeFn(
  context: Pick<SystemContext, "utility" | "conditions">,
) {
  const { utility, conditions } = context
  const { hasShorthand, resolveShorthand } = utility
  const { breakpoints } = conditions

  return function (styles: Dict) {
    return walkObject(
      styles,
      (value) =>
        isArray(value) ? toResponsiveObject(value, breakpoints) : value,
      {
        stop: (value) => isArray(value),
        getKey: hasShorthand ? resolveShorthand : undefined,
      },
    )
  }
}
