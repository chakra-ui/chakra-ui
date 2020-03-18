import { Dict, runIfFn } from "@chakra-ui/utils"
import { jsx as emotion } from "@emotion/core"
import { SystemStyleObject, css } from "@chakra-ui/parser"

const getCSS = (props: { sx?: any; css?: any }) => {
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
  interface DOMAttributes<T> {
    sx?: SystemStyleObject
  }
}

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicAttributes {
      sx?: SystemStyleObject
    }
  }
}

export default jsx
