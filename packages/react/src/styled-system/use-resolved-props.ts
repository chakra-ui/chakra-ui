import { css as pandaCss } from "@chakra-ui/styled-system/css"
import { isCssProperty } from "@chakra-ui/styled-system/jsx/is-valid-prop"
import { useMemo } from "react"
import { cx, splitProps } from "../utils"

const htmlProps = new Set([
  "htmlWidth",
  "htmlHeight",
  "htmlSize",
  "htmlTranslate",
])

export function isHtmlProp(prop: unknown) {
  return typeof prop === "string" && htmlProps.has(prop)
}

interface ResolvedPropsResult {
  styles: Record<string, any>
  props: Record<string, any>
}

export function useResolvedProps(
  inProps: any,
  cvaRecipe: any,
  shouldForwardProps: any,
): ResolvedPropsResult {
  const { children, ...props } = inProps

  const result = useMemo(() => {
    const [forwardedProps, restProps_B] = splitProps(props, (key) =>
      shouldForwardProps(key, cvaRecipe.variantKeys),
    )

    const [variantProps, restProps_C] = splitProps(
      restProps_B,
      cvaRecipe.variantKeys,
    )

    const [styleProps, elementProps] = splitProps(restProps_C, isCssProperty)

    return {
      forwardedProps,
      variantProps,
      styleProps,
      elementProps,
    }
  }, [cvaRecipe.variantKeys, shouldForwardProps, props])

  const { css: cssStyles, ...propStyles } = result.styleProps

  const cvaStyles = useMemo(() => {
    const variantProps = { ...result.variantProps }
    const hasColorPalette = cvaRecipe.variantKeys.includes("colorPalette")
    const hasOrientation = cvaRecipe.variantKeys.includes("orientation")

    if (!hasColorPalette) {
      variantProps.colorPalette = props.colorPalette
    }
    if (!hasOrientation) {
      variantProps.orientation = props.orientation
    }
    return cvaRecipe(variantProps)
  }, [cvaRecipe, result.variantProps, props.colorPalette, props.orientation])

  const styles = useMemo((): any => {
    const cvaClass = typeof cvaStyles === "string" ? cvaStyles : ""
    return cx(cvaClass, pandaCss(...toArray(cssStyles), propStyles))
  }, [cvaStyles, cssStyles, propStyles])

  return {
    styles,
    props: {
      ...result.forwardedProps,
      ...result.elementProps,
      children,
    },
  }
}

const toArray = (val: any) => {
  const res = Array.isArray(val) ? val : [val]
  return res.filter(Boolean).flat()
}
