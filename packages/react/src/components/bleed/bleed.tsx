import { isCssUnit, isCssVar, mapResponsive } from "@chakra-ui/utils"
import { SystemStyleObject } from "../.."
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"

export interface BleedProps extends HTMLChakraProps<"div"> {
  inline?: SystemStyleObject["marginInline"]
  block?: SystemStyleObject["marginBlock"]
}

export const Bleed = forwardRef<BleedProps, "div">(function Bleed(props, ref) {
  const { inline, block, ...rest } = props

  const valueFn = (v: string) =>
    isCssUnit(v) || isCssVar(v) ? v : `space.${v}, ${v}`

  return (
    <chakra.div
      ref={ref}
      {...rest}
      css={{
        "--bleed-x": mapResponsive(inline, valueFn),
        "--bleed-y": mapResponsive(block, valueFn),
        marginInline: "calc(var(--bleed-x, 0) * -1)",
        marginBlock: "calc(var(--bleed-y, 0) * -1)",
      }}
    />
  )
})

Bleed.displayName = "Bleed"
