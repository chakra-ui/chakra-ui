import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface InputGroupContext {
  variant?: string
  size?: string
  hasLeftElement: boolean
  setHasLeftElement: React.Dispatch<React.SetStateAction<boolean>>
  hasRightElement: boolean
  setHasRightElement: React.Dispatch<React.SetStateAction<boolean>>
}

const [InputGroupProvider, useInputGroup] = createContext<InputGroupContext>({
  strict: false,
})

export { useInputGroup }

export type InputGroupProps = PropsOf<typeof chakra.div> & ThemingProps

/**
 * InputGroup
 *
 * Wrapper element used to enhance an input with an InputAddon
 * or an InputElement
 */

export const InputGroup = (props: InputGroupProps) => {
  const defaults = useThemeDefaultProps("Input")

  const {
    children,
    size = defaults?.size,
    variant = defaults?.variant,
    ...rest
  } = props

  const [hasLeftElement, setHasLeftElement] = React.useState(false)
  const [hasRightElement, setHasRightElement] = React.useState(false)

  const context = React.useMemo(
    () => ({
      size,
      variant,
      hasLeftElement,
      setHasLeftElement,
      hasRightElement,
      setHasRightElement,
    }),
    [hasLeftElement, hasRightElement, size, variant],
  )

  return (
    <chakra.div display="flex" position="relative" {...rest}>
      <InputGroupProvider value={context}>{children}</InputGroupProvider>
    </chakra.div>
  )
}

if (__DEV__) {
  InputGroup.displayName = "InputGroup"
}
