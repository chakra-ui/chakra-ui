import { chakra } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"

const [InputGroupProvider, useInputGroup] = createContext<{
  variant: string
  variantSize: string
  hasLeftElement: boolean
  setHasLeftElement: React.Dispatch<React.SetStateAction<boolean>>
  hasRightElement: boolean
  setHasRightElement: React.Dispatch<React.SetStateAction<boolean>>
}>(false)

export { useInputGroup }

const InputGroup = ({
  children,
  variantSize = "md",
  variant = "outline",
  ...props
}: {
  children?: React.ReactNode
  variant?: string
  variantSize?: string
}) => {
  const [hasLeftElement, setHasLeftElement] = React.useState(false)
  const [hasRightElement, setHasRightElement] = React.useState(false)

  return (
    <chakra.div display="flex" position="relative" {...props}>
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

export default InputGroup
