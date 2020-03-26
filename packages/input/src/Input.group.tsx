import {
  chakra,
  PropsOf,
  ThemingProps,
  useComponentDefaults,
} from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
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

export const InputGroup = (props: InputGroupProps) => {
  const defaults = useComponentDefaults("Input")

  const {
    children,
    size = defaults?.size,
    variant = defaults?.variant,
    ...rest
  } = props

  const [hasLeftElement, setHasLeftElement] = React.useState(false)
  const [hasRightElement, setHasRightElement] = React.useState(false)

  return (
    <chakra.div display="flex" position="relative" {...rest}>
      <InputGroupProvider
        value={{
          size,
          variant,
          hasLeftElement,
          setHasLeftElement,
          hasRightElement,
          setHasRightElement,
        }}
      >
        {children}
      </InputGroupProvider>
    </chakra.div>
  )
}
