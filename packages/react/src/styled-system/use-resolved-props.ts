import { useMemo } from "react"
import { splitProps } from "../utils"
import { useChakraContext } from "./provider"

export function useResolvedProps(
  inProps: any,
  cvaRecipe: any,
  shouldForwardProps: any,
) {
  const { css, isValidProperty } = useChakraContext()

  const { children, ...props } = inProps

  const result = useMemo(() => {
    const [htmlProps, restProps_A] = splitProps(props, [
      "htmlWidth",
      "htmlHeight",
      "htmlSize",
      "htmlTranslate",
    ])

    const [forwardedProps, restProps_B] = splitProps(restProps_A, (key) =>
      shouldForwardProps(key, cvaRecipe.variantKeys),
    )

    const [variantProps, restProps_C] = splitProps(
      restProps_B,
      cvaRecipe.variantKeys,
    )

    const [styleProps, elementProps] = splitProps(restProps_C, isValidProperty)

    return {
      htmlProps: getHtmlProps(htmlProps),
      forwardedProps,
      variantProps,
      styleProps,
      elementProps,
    }
  }, [cvaRecipe.variantKeys, shouldForwardProps, props, isValidProperty])

  const { css: cssStyles, ...propStyles } = result.styleProps

  const cvaStyles = useMemo(
    () => cvaRecipe(result.variantProps),
    [cvaRecipe, result.variantProps],
  )

  const styles = useMemo((): any => {
    return css(cvaStyles, ...toArray(cssStyles), propStyles)
  }, [css, cvaStyles, cssStyles, propStyles])

  return {
    styles,
    props: {
      ...result.forwardedProps,
      ...result.elementProps,
      ...result.htmlProps,
      children,
    },
  }
}

const getHtmlProps = (props: any) => {
  const htmlProps: any = {}
  for (const key in props) {
    if (key.startsWith("html")) {
      htmlProps[key.replace("html", "").toLowerCase()] = props[key]
    }
  }
  return htmlProps
}

const toArray = (val: any) => {
  const res = Array.isArray(val) ? val : [val]
  return res.filter(Boolean).flat()
}
