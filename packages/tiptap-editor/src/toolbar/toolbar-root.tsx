"use client"

import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

export interface ToolbarRootProps extends BoxProps {
  /**
   * Visual variant of the toolbar
   * @default "outline"
   */
  variant?: "outline" | "subtle" | "solid"
}

/**
 * Root container for the editor toolbar
 * Provides consistent styling and spacing for toolbar controls
 */
export function ToolbarRoot(props: ToolbarRootProps) {
  const { variant = "outline", children, ...rest } = props

  const styles = {
    outline: {
      borderBottom: "1px solid",
      borderColor: "border.emphasized",
      bg: "bg",
    },
    subtle: {
      bg: "bg.subtle",
      borderBottom: "1px solid",
      borderColor: "border",
    },
    solid: {
      bg: "bg.emphasized",
      borderBottom: "1px solid",
      borderColor: "border.emphasized",
    },
  }

  return (
    <Box
      display="flex"
      gap="1"
      px="2"
      py="1.5"
      flexWrap="wrap"
      alignItems="center"
      {...styles[variant]}
      {...rest}
    >
      {children}
    </Box>
  )
}
