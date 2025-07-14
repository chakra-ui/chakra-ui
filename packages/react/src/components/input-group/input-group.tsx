"use client"

import { Children, cloneElement, forwardRef } from "react"
import type { BoxProps } from "../box"
import { Group } from "../group"
import { InputAddon, type InputAddonProps } from "../input-addon"
import { InputElement, type InputElementProps } from "../input-element"

export interface InputGroupProps extends BoxProps {
  /**
   * The props to pass to the start element
   */
  startElementProps?: InputElementProps | undefined
  /**
   * The props to pass to the end element
   */
  endElementProps?: InputElementProps | undefined
  /**
   * The start element to render the inner left of the group
   */
  startElement?: React.ReactNode | undefined
  /**
   * The end element to render the inner right of the group
   */
  endElement?: React.ReactNode | undefined
  /**
   * The start addon to render the left of the group
   */
  startAddon?: React.ReactNode | undefined
  /**
   * The props to pass to the start addon
   */
  startAddonProps?: InputAddonProps | undefined
  /**
   * The end addon to render the right of the group
   */
  endAddon?: React.ReactNode | undefined
  /**
   * The props to pass to the end addon
   */
  endAddonProps?: InputAddonProps | undefined
  /**
   * The children to render inside the group
   */
  children: React.ReactElement<InputElementProps>
  /**
   * The offset to apply to the start element
   */
  startOffset?: InputElementProps["paddingStart"] | undefined
  /**
   * The offset to apply to the end element
   */
  endOffset?: InputElementProps["paddingEnd"] | undefined
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      startElement,
      startElementProps,
      endElement,
      endElementProps,
      startAddon,
      startAddonProps,
      endAddon,
      endAddonProps,
      children,
      startOffset = "0px",
      endOffset = "0px",
      ...rest
    } = props

    const child = Children.only<React.ReactElement<InputElementProps>>(children)
    const attached = Boolean(startAddon || endAddon)

    return (
      <Group
        width="full"
        ref={ref}
        attached={attached}
        skip={(el) => el.type === InputElement}
        {...rest}
      >
        {startAddon && (
          <InputAddon {...startAddonProps}>{startAddon}</InputAddon>
        )}
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}
        {cloneElement(child, {
          ...(startElement && {
            ps: `calc(var(--input-height) - ${startOffset})`,
          }),
          ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
          ...children.props,
        })}
        {endElement && (
          <InputElement placement="end" {...endElementProps}>
            {endElement}
          </InputElement>
        )}
        {endAddon && <InputAddon {...endAddonProps}>{endAddon}</InputAddon>}
      </Group>
    )
  },
)
