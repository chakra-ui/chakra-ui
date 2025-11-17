"use client"

import type { StackProps } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"

export interface ToolbarProps extends StackProps {
  /**
   * Visual variant of the toolbar
   * @default "default"
   */
  variant?: "default" | "subtle"
}

export function Toolbar(props: ToolbarProps) {
  const { variant = "default", children, ...rest } = props

  return (
    <HStack
      gap="0"
      spaceX="0"
      borderBottom={variant === "default" ? "1px solid" : undefined}
      borderColor={variant === "default" ? "border" : undefined}
      px="2"
      py="1"
      bg={variant === "subtle" ? "bg.subtle" : undefined}
      {...rest}
    >
      {children}
    </HStack>
  )
}
