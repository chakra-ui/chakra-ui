"use client"

import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react/menus"
import type { ReactNode } from "react"
import { useEditorContext } from "../context"

export interface FloatingMenuProps extends Omit<BoxProps, "children"> {
  /**
   * Controls and components to render inside the floating menu
   */
  children: ReactNode
}

/**
 * Floating menu that appears at the start of a new line
 */
export function FloatingMenu(props: FloatingMenuProps) {
  const { children, ...rest } = props
  const { editor } = useEditorContext()

  if (!editor) return null

  return (
    <TiptapFloatingMenu editor={editor}>
      <Box
        bg="white"
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        shadow="lg"
        p="2"
        display="flex"
        flexDirection="column"
        gap="1"
        _dark={{ bg: "gray.800" }}
        {...rest}
      >
        {children}
      </Box>
    </TiptapFloatingMenu>
  )
}
