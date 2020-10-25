import { forwardRef } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Icon, IconProps } from "./icon"

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string
  /**
   * The `svg` path or group element
   */
  path?: React.ReactElement | React.ReactElement[]
  /**
   * If the has a single path, simply copy the path's `d` attribute
   */
  d?: string
  /**
   * The display name useful in the dev tools
   */
  displayName?: string
  /**
   * Default props automatically passed to the component; overwriteable
   */
  defaultProps?: IconProps
}

export function createIcon(options: CreateIconOptions) {
  const {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    path,
    displayName,
    defaultProps = {},
  } = options

  const Comp = forwardRef<IconProps, "svg">((props, ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
        {path ?? <path fill="currentColor" d={pathDefinition} />}
      </Icon>
    )
  })

  if (__DEV__) {
    Comp.displayName = displayName
  }

  return Comp
}
