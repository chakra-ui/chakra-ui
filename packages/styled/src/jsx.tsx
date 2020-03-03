// All credits goes to theme-ui for this
import { Dict, runIfFn } from "@chakra-ui/utils"
import { jsx as emotion } from "@emotion/core"
import css from "@styled-system/css"
import { SystemStyleObject } from "@chakra-ui/parser"

const getCSS = (props: { sx?: object; css?: object }) => {
  if (!props.sx && !props.css) return undefined
  return (theme: object) => {
    const styles = css(props.sx)(theme)
    const raw = runIfFn(props.css, theme)
    return [styles, raw]
  }
}

const parseProps = (props: any) => {
  if (!props) return null
  const next: Dict = {}
  for (const key in props) {
    if (key === "sx") continue
    next[key] = props[key]
  }
  const css = getCSS(props)
  if (css) next.css = css
  return next
}

export const jsx = (
  type: React.ElementType,
  props: object,
  ...children: React.ReactNode[]
) => emotion.apply(undefined, [type, parseProps(props), ...children])

declare module "react" {
  // eslint-disable-next-line
  interface DOMAttributes<T> extends SystemStyleObject {}
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line
    interface IntrinsicAttributes extends SystemStyleObject {}
  }
}

export default jsx
