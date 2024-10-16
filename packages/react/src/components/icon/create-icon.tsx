"use client"

import { Children, forwardRef } from "react"
import { Icon, type IconProps } from "./icon"

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string
  /**
   * The `svg` path or group element
   * @type React.ReactElement | React.ReactElement[]
   */
  path?: React.ReactElement | React.ReactElement[]
  /**
   * If the `svg` has a single path, simply copy the path's `d` attribute
   */
  d?: string
  /**
   * The display name useful in the dev tools
   */
  displayName?: string
  /**
   * Default props automatically passed to the component; overwritable
   */
  defaultProps?: IconProps
}

export function createIcon(options: CreateIconOptions) {
  const {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    displayName,
    defaultProps = {},
  } = options

  const path = Children.toArray(options.path)

  const Comp = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <Icon
      ref={ref}
      asChild={false}
      viewBox={viewBox}
      {...defaultProps}
      {...props}
    >
      {path.length ? path : <path fill="currentColor" d={pathDefinition} />}
    </Icon>
  ))

  Comp.displayName = displayName

  return Comp
}
