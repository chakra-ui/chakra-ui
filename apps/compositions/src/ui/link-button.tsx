"use client"

import type { HTMLChakraProps, SlotRecipeProps } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import { forwardRef } from "react"

interface LinkButtonIconProps {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
}

export interface LinkButtonProps
  extends HTMLChakraProps<"a">,
    SlotRecipeProps<"Button">,
    LinkButtonIconProps {}

// Replace "a" with your framework's link component
const StyledLink = chakra("a")

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(props, ref) {
    const { startIcon, endIcon, children, ...rest } = props

    return (
      <StyledLink ref={ref} {...rest}>
        <ButtonContent startIcon={startIcon} endIcon={endIcon}>
          {children}
        </ButtonContent>
      </StyledLink>
    )
  },
)

const ButtonContent = (props: React.PropsWithChildren<LinkButtonIconProps>) => {
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
