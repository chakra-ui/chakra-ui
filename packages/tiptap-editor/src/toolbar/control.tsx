"use client"

import type { IconButtonProps } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import type { ReactNode } from "react"
import { useEditorContext } from "../context"

export interface ControlProps extends Omit<IconButtonProps, "children"> {
  /**
   * Icon to display in the button
   */
  icon?: ReactNode

  /**
   * Label for the control (used in tooltip and aria-label)
   */
  label?: string

  /**
   * Whether the control is currently active
   */
  isActive?: boolean

  /**
   * Tooltip content (defaults to label)
   */
  tooltipLabel?: string

  /**
   * Callback when control is pressed
   */
  onClick?: () => void
}

/**
 * Base control button component for toolbar
 * Handles active state styling, tooltips, and accessibility
 */
export function Control(props: ControlProps) {
  const {
    icon,
    label,
    isActive = false,
    disabled,
    tooltipLabel,
    onClick,
    ...rest
  } = props
  const { editor } = useEditorContext()

  if (!editor) return null

  const button = (
    <IconButton
      size="sm"
      variant={isActive ? "solid" : "ghost"}
      aria-label={label || "Control"}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon}
    </IconButton>
  )

  const tooltip = tooltipLabel || label

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>
  }

  return button
}
