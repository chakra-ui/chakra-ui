import type { FloatProps } from "@chakra-ui/react"
import { Blockquote as ChakraBlockquote, Circle, Float } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface BlockquoteProps extends ChakraBlockquote.RootProps {
  cite?: React.ReactNode
  citeUrl?: string
  icon?: React.ReactNode
  showIcon?: boolean
  dash?: boolean
  iconPlacement?: FloatProps["placement"]
}

export const Blockquote = forwardRef<HTMLDivElement, BlockquoteProps>(
  function Blockquote(props, ref) {
    const {
      children,
      cite,
      citeUrl,
      dash,
      icon,
      iconPlacement = "middle-start",
      showIcon = !!icon,
      ...rest
    } = props

    return (
      <ChakraBlockquote.Root ref={ref} {...rest}>
        {showIcon && (
          <Float placement={iconPlacement}>
            <Circle bg="bg" size="8">
              <ChakraBlockquote.Icon asChild={!!icon}>
                {icon}
              </ChakraBlockquote.Icon>
            </Circle>
          </Float>
        )}
        <ChakraBlockquote.Content cite={citeUrl}>
          {children}
        </ChakraBlockquote.Content>
        {cite && (
          <ChakraBlockquote.Caption>
            {dash ? <>&mdash;</> : null} <cite>{cite}</cite>
          </ChakraBlockquote.Caption>
        )}
      </ChakraBlockquote.Root>
    )
  },
)
