import { type BoxProps, Group, InputElement } from "@chakra-ui/react"
import { cloneElement } from "react"

export interface InputGroupProps extends BoxProps {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  children: React.ReactElement
}

export const InputGroup = (props: InputGroupProps) => {
  const { startElement, endElement, children, ...rest } = props
  return (
    <Group {...rest}>
      {startElement && (
        <InputElement pointerEvents="none">{startElement}</InputElement>
      )}
      {cloneElement(children, {
        ...(startElement && { ps: "calc(var(--input-height) - 6px)" }),
        ...(endElement && { pe: "calc(var(--input-height) - 6px)" }),
        ...children.props,
      })}
      {endElement && <InputElement placement="end">{endElement}</InputElement>}
    </Group>
  )
}
