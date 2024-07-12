import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from "@chakra-ui/react"
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import { forwardRef } from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props

    const trulyDisabled = loading || disabled
    const showSpinner = loading && !loadingText

    return (
      <ChakraButton disabled={trulyDisabled} ref={ref} {...rest}>
        {showSpinner && <ButtonSpinner />}
        {loading
          ? loadingText || <Span opacity={0}>{children}</Span>
          : children}
      </ChakraButton>
    )
  },
)

const ButtonSpinner = () => (
  <AbsoluteCenter display="inline-flex">
    <Spinner boxSize="1em" color="currentColor" />
  </AbsoluteCenter>
)
