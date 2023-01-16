import { HTMLChakraProps, chakra } from "@chakra-ui/system"

import { rotate } from "./progress.utils"

interface ShapeProps extends HTMLChakraProps<"svg"> {
  size?: string | number
  /**
   * @default false
   */
  isIndeterminate?: boolean
}

export const Shape = (props: ShapeProps) => {
  const { size, isIndeterminate, ...rest } = props
  return (
    <chakra.svg
      viewBox="0 0 100 100"
      __css={{
        width: size,
        height: size,
        animation: isIndeterminate ? `${rotate} 2s linear infinite` : undefined,
      }}
      {...rest}
    />
  )
}

Shape.displayName = "Shape"
