import {
  type BoxProps,
  Group,
  InputAddon,
  type InputAddonProps,
  InputElement,
  type InputElementProps,
} from "@chakra-ui/react"
import * as React from "react"

export interface InputGroupProps extends BoxProps {
  startElement?: React.ReactNode
  startElementProps?: InputElementProps
  endElement?: React.ReactNode
  endElementProps?: InputElementProps

  startAddon?: React.ReactNode
  startAddonProps?: InputAddonProps
  endAddon?: React.ReactNode
  endAddonProps?: InputAddonProps

  children: React.ReactElement<InputElementProps>
  startOffset?: InputElementProps["paddingStart"]
  endOffset?: InputElementProps["paddingEnd"]
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      startElement,
      startElementProps,
      endElement,
      endElementProps,
      children,
      startAddon,
      startAddonProps,
      endAddon,
      endAddonProps,
      startOffset = "6px",
      endOffset = "6px",
      ...rest
    } = props

    const child =
      React.Children.only<React.ReactElement<InputElementProps>>(children)

    return (
      <Group ref={ref} {...rest}>
        {startAddon && (
          <InputAddon {...startAddonProps}>{startAddon}</InputAddon>
        )}
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}
        {React.cloneElement(child, {
          ...(startElement &&
            !startAddon && {
              ps: `calc(var(--input-height) - ${startOffset})`,
            }),
          ...(endElement &&
            !endAddon && {
              pe: `calc(var(--input-height) - ${endOffset})`,
            }),
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
