"use client"

import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus"
import type { ReactNode } from "react"
import { useEditorContext } from "../context"

export interface BubbleMenuProps extends Omit<BoxProps, "children"> {
  /**
   * Controls and components to render inside the bubble menu
   */
  children: ReactNode
}

/**
 * Bubble menu that appears when text is selected
 */
export function BubbleMenu(props: BubbleMenuProps) {
  const { children, ...rest } = props
  const { editor } = useEditorContext()

  if (!editor) return null

  return (
    <TiptapBubbleMenu editor={editor}>
      <Box
        bg="white"
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        shadow="lg"
        p="2"
        display="flex"
        gap="1"
        _dark={{ bg: "gray.800" }}
        {...rest}
      >
        {children}
      </Box>
    </TiptapBubbleMenu>
  )
}
