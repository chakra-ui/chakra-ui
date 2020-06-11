import React from "react"
import { Icon, IconProps } from "./icon"
import { __DEV__ } from "@chakra-ui/utils"
// import { forwardRef } from "@chakra-ui/system"

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string
  /**
   * The `svg` path or group element
   */
  path?: React.ReactElement
  /**
   * If the has a single path, simply copy the path's `d` attribute
   */
  d?: string
  /**
   * The display name useful in the dev tools
   */
  displayName?: string
}

export function createIcon(options: CreateIconOptions) {
  const {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    path,
    displayName,
  } = options

  const Component = React.forwardRef(function Component(
    props: IconProps,
    ref: React.Ref<any>,
  ) {
    const { boxSize = "1em", ...rest } = props
    return (
      <Icon ref={ref} as="svg" boxSize={boxSize} viewBox={viewBox} {...rest}>
        {path ?? <path fill="currentColor" d={pathDefinition} />}
      </Icon>
    )
  })

  if (__DEV__) {
    Component.displayName = displayName
  }

  return Component
}
