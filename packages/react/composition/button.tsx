import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from "@chakra-ui/react"
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import { forwardRef } from "react"

interface ButtonIconProps {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
}

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps
  extends ChakraButtonProps,
    ButtonIconProps,
    ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, loadingText, startIcon, endIcon, children, ...rest } =
      props

    const content = (
      <ButtonContent startIcon={startIcon} endIcon={endIcon}>
        {children}
      </ButtonContent>
    )

    return (
      <ChakraButton ref={ref} {...rest}>
        {loading && (
          <AbsoluteCenter>
            <Spinner boxSize="1em" color="currentColor" />
          </AbsoluteCenter>
        )}
        {loading ? loadingText || <Span opacity={0}>{content}</Span> : content}
      </ChakraButton>
    )
  },
)

function ButtonContent(props: React.PropsWithChildren<ButtonProps>) {
  const { children, startIcon, endIcon } = props
  if (!startIcon && !endIcon) return children
  return (
    <>
      {startIcon && <Span marginEnd="2">{startIcon}</Span>}
      <span>{children}</span>
      {endIcon && <Span marginStart="2">{endIcon}</Span>}
    </>
  )
}
