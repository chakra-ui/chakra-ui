import { Dict, runIfFn } from "@chakra-ui/utils"
import { jsx as emotion } from "@emotion/core"
import { SystemStyleObject, css } from "@chakra-ui/css"

interface GetCSS {
  sx?: any
  css?: any
}

function getCSS(props: GetCSS) {
  if (!props.sx && !props.css) return undefined
  /**
   * Leverage emotion's css function interpolation to access the theme
   */
  return (theme: Dict) => {
    /**
     * process the theme-aware cx prop
     */
    const sxStyles = css(props.sx)(theme)
    /**
     * process the normal emotion's css prop
     * (NB: This is not theme-aware, and you can't use shorthand style props)
     */
    const cssStyles = runIfFn(props.css, theme)
    /**
     * return an array value and allow emotion do the rest.
     * By default, emotion can handle array style values
     */
    return [cssStyles, sxStyles]
  }
}

function parse(props: Dict | undefined) {
  if (!props) return null

  const computedProps: Dict = {}

  for (const prop in props) {
    if (prop === "sx") continue
    computedProps[prop] = props[prop]
  }

  const css = getCSS(props)

  if (css) computedProps.css = css

  return computedProps
}

export const jsx = (
  type: React.ElementType,
  props: Dict,
  ...children: React.ReactNode[]
) => emotion.apply(undefined, [type, parse(props), ...children])

interface SxProp {
  /**
   * Chakra is here!
   */
  sx?: SystemStyleObject
}

declare module "react" {
  interface Attributes extends SxProp {}
}

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicAttributes extends SxProp {}
  }
}

export default jsx
