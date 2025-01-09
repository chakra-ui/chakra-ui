import { useMemo } from "react"
import { splitProps } from "../utils"
import { useChakraContext } from "./provider"

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
  const { css, isValidProperty } = useChakraContext()

  const { children, ...props } = inProps

  const result = useMemo(() => {
    const [forwardedProps, restProps_B] = splitProps(props, (key) =>
      shouldForwardProps(key, cvaRecipe.variantKeys),
    )

    const [variantProps, restProps_C] = splitProps(
      restProps_B,
      cvaRecipe.variantKeys,
    )

    const [styleProps, elementProps] = splitProps(restProps_C, isValidProperty)

    return {
      forwardedProps,
      variantProps,
      styleProps,
      elementProps,
    }
  }, [cvaRecipe.variantKeys, shouldForwardProps, props, isValidProperty])

  const { css: cssStyles, ...propStyles } = result.styleProps

  const cvaStyles = useMemo(() => {
    const variantProps = { ...result.variantProps }
    if (!cvaRecipe.variantKeys.includes("colorPalette")) {
      variantProps.colorPalette = props.colorPalette
    }
    if (!cvaRecipe.variantKeys.includes("orientation")) {
      variantProps.orientation = props.orientation
    }
    return cvaRecipe(variantProps)
  }, [cvaRecipe, result.variantProps, props.colorPalette, props.orientation])

  const styles = useMemo((): any => {
    return css(cvaStyles, ...toArray(cssStyles), propStyles)
  }, [css, cvaStyles, cssStyles, propStyles])

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
