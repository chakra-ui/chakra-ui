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
    const {
      loading,
      disabled,
      loadingText,
      startIcon,
      endIcon,
      children,
      ...rest
    } = props

    const trulyDisabled = loading || disabled
    const showSpinner = loading && !loadingText

    const content = (
      <ButtonContent startIcon={startIcon} endIcon={endIcon}>
        {children}
      </ButtonContent>
    )

    return (
      <ChakraButton disabled={trulyDisabled} ref={ref} {...rest}>
        {showSpinner && <ButtonSpinner />}
        {loading ? loadingText || <Span opacity={0}>{content}</Span> : content}
      </ChakraButton>
    )
  },
)

const ButtonContent = (props: React.PropsWithChildren<ButtonProps>) => {
  const { children, startIcon, endIcon } = props
  if (!startIcon && !endIcon) return children
  return (
    <>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </>
  )
}

const ButtonSpinner = () => (
  <AbsoluteCenter display="inline-flex">
    <Spinner boxSize="1em" color="currentColor" />
  </AbsoluteCenter>
)
