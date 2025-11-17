"use client"

import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

export interface RichTextEditorProps extends BoxProps {
  /**
   * Visual variant of the editor container
   * @default "outline"
   */
  variant?: "outline" | "filled" | "subtle"
}

export function RichTextEditor(props: RichTextEditorProps) {
  const { variant = "outline", children, ...rest } = props

  const styles = {
    outline: {
      border: "1px solid",
      borderColor: "border",
      borderRadius: "md",
      overflow: "hidden",
    },
    filled: {
      bg: "bg.muted",
      border: "1px solid",
      borderColor: "border.subtle",
      borderRadius: "md",
      overflow: "hidden",
    },
    subtle: {
      borderRadius: "md",
      overflow: "hidden",
    },
  }

  return (
    <Box {...styles[variant]} {...rest}>
      {children}
    </Box>
  )
}
