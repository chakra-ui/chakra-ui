import * as React from "react"
import { chakra, PropsOf } from "@chakra-ui/system"

type Props = PropsOf<typeof chakra.div> & { axis?: "x" | "y" | "both" }

export function AbsoluteCenter({ axis = "both", ...props }: Props) {
  const center = {
    x: { left: "50%", transform: `translateX(-50%)` },
    y: { top: "50%", transform: `translateY(-50%)` },
    both: { left: "50%", top: "50%", transform: `translate(-50%, -50%)` },
  }

  return <chakra.div position="absolute" {...center[axis]} {...props} />
}

export function FlexCenter({ axis = "both", ...props }: Props) {
  const center = {
    x: { justifyContent: "center" },
    y: { alignItems: "center" },
    both: { justifyContent: "center", alignItems: "center" },
  }
  return <chakra.div display="flex" {...center[axis]} {...props} />
}

function GridCenter({ axis = "both", ...props }: Props) {
  const center = {
    x: { justifyItems: "center", alignItems: "start" },
    y: { justifyItems: "start", alignItems: "center" },
    both: { justifyItems: "center", alignItems: "center" },
  }
  return <chakra.div display="grid" {...center[axis]} {...props} />
}

export function Center(props: Props & { use?: "absolute" | "flex" | "grid" }) {
  const { use = "flex", ...rest } = props
  const components = {
    flex: FlexCenter,
    grid: GridCenter,
    absolute: AbsoluteCenter,
  }
  const Component = components[use]

  return <Component {...rest} />
}
