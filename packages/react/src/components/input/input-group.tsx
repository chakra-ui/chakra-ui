"use client"

import { Children, cloneElement, forwardRef } from "react"
import type { BoxProps } from "../box"
import { Group } from "../group"
import { InputAddon, type InputAddonProps } from "./input-addon"
import { InputElement, type InputElementProps } from "./input-element"

export interface InputGroupProps extends BoxProps {
  startElementProps?: InputElementProps | undefined
  endElementProps?: InputElementProps | undefined
  startElement?: React.ReactNode | undefined
  endElement?: React.ReactNode | undefined
  startAddon?: React.ReactNode | undefined
  startAddonProps?: InputAddonProps | undefined
  endAddon?: React.ReactNode | undefined
  endAddonProps?: InputAddonProps | undefined
  children: React.ReactElement<InputElementProps>
  startOffset?: InputElementProps["paddingStart"] | undefined
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
