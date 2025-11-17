"use client"

import type { StackProps } from "@chakra-ui/react"
import { Separator as ChakraSeparator, HStack } from "@chakra-ui/react"

export interface ControlsGroupProps extends StackProps {
  /**
   * Show a separator after the group
   * @default true
   */
  divider?: boolean
}

export function ControlsGroup(props: ControlsGroupProps) {
  const { divider = true, children, ...rest } = props

  return (
    <>
      <HStack gap="0" spaceX="0" {...rest}>
        {children}
      </HStack>
      {divider && (
        <ChakraSeparator
          orientation="vertical"
          height="6"
          mx="1"
          borderColor="border"
        />
      )}
    </>
  )
}
