import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"

export type ConnectorProps = PropsOf<typeof chakra.div> & {
  component?: React.ComponentType
}

const SpacerLine = chakra("div", {
  baseStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "2px",
  },
})

const Connector = React.forwardRef(function Connector(
  { component: Component, ...rest }: ConnectorProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return React.isValidElement(Component) ? (
    React.cloneElement(Component, {
      ...rest,
    })
  ) : (
    <SpacerLine ref={ref} {...rest} />
  )
})

export default Connector

Connector.defaultProps = {
  bg: "gray.100",
}
