import { Group, InputElement } from "@chakra-ui/react"
import * as React from "react"

export const InputGroup = React.forwardRef(function InputGroup(props, ref) {
  const {
    startElement,
    startElementProps,
    endElement,
    endElementProps,
    children,
    startOffset = "6px",
    endOffset = "6px",
    ...rest
  } = props

  const child = React.Children.only(children)

  return (
    <Group ref={ref} {...rest}>
      {startElement && (
        <InputElement pointerEvents="none" {...startElementProps}>
          {startElement}
        </InputElement>
      )}
      {React.cloneElement(child, {
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
    </Group>
  )
})
