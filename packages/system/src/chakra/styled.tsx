import { isFunction, isString } from "@chakra-ui/utils"
import { ThemeContext } from "@emotion/core"
import * as React from "react"
import {
  filterProps,
  getDisplayName,
} from "../createChakra/create-chakra.utils"
import { forwardRef } from "../forward-ref"
import { jsx } from "../system"
import { As, ChakraComponent } from "./types"

const styled = <T extends As>(tag: T) => (...interpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, apply, ...props }: any, ref: React.Ref<Element>) => {
      const element = as || tag
      const isTag = isString(element)

      let computedProps = isTag ? {} : { ...props }
      const computedStyles = {}

      const theme = React.useContext(ThemeContext)

      interpolations.forEach(interpolation => {
        const style = isFunction(interpolation)
          ? interpolation({ theme, apply, ...props })
          : interpolation
        Object.assign(computedStyles, style)
      })

      if (isTag) computedProps = filterProps(props)

      return jsx(element, {
        ...computedProps,
        ref,
        css: computedStyles,
      })
    },
  )

  Styled.displayName = `Chakra(${getDisplayName(tag)})`

  return Styled as ChakraComponent<T>
}

export default styled
