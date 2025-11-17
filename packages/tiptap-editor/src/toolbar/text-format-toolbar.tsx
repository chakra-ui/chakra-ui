"use client"

import type { StackProps } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  BulletList,
  Code,
  H1,
  H2,
  H3,
  Italic,
  Link,
  OrderedList,
  Redo,
  Strike,
  Underline,
  Undo,
} from "./controls"
import { ControlsGroup } from "./controls-group"

export interface TextFormatToolbarProps extends StackProps {
  /**
   * Show heading controls (H1, H2, H3)
   * @default true
   */
  showHeadings?: boolean

  /**
   * Show alignment controls
   * @default true
   */
  showAlignment?: boolean

  /**
   * Show link control
   * @default true
   */
  showLink?: boolean

  /**
   * Show undo/redo controls
   * @default true
   */
  showHistory?: boolean
}

/**
 * Pre-built toolbar with common text formatting controls
 * Includes: text styles, headings, lists, alignment, links, and history
 */
export function TextFormatToolbar(props: TextFormatToolbarProps) {
  const {
    showHeadings = true,
    showAlignment = true,
    showLink = true,
    showHistory = true,
    ...rest
  } = props

  return (
    <HStack gap="0" spaceX="0" {...rest}>
      {/* Text formatting */}
      <ControlsGroup>
        <Bold />
        <Italic />
        <Underline />
        <Strike />
        <Code />
      </ControlsGroup>

      {/* Headings */}
      {showHeadings && (
        <ControlsGroup>
          <H1 />
          <H2 />
          <H3 />
        </ControlsGroup>
      )}

      {/* Lists */}
      <ControlsGroup>
        <BulletList />
        <OrderedList />
      </ControlsGroup>

      {/* Alignment */}
      {showAlignment && (
        <ControlsGroup>
          <AlignLeft />
          <AlignCenter />
          <AlignRight />
        </ControlsGroup>
      )}

      {/* Link */}
      {showLink && (
        <ControlsGroup>
          <Link />
        </ControlsGroup>
      )}

      {/* History */}
      {showHistory && (
        <ControlsGroup divider={false}>
          <Undo />
          <Redo />
        </ControlsGroup>
      )}
    </HStack>
  )
}
