import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"

interface InputGroupContext {
  variant: string
  variantSize: string
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
  const { children, variantSize = "md", variant = "outline", ...rest } = props
  const [hasLeftElement, setHasLeftElement] = React.useState(false)
  const [hasRightElement, setHasRightElement] = React.useState(false)

  return (
    <chakra.div display="flex" position="relative" {...rest}>
      <InputGroupProvider
        value={{
          variantSize,
          variant,
          hasLeftElement,
          setHasLeftElement,
          hasRightElement,
          setHasRightElement,
        }}
        children={children}
      />
    </chakra.div>
  )
}
