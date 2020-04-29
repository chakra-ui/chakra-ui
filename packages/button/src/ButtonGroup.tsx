import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type ButtonGroupProps = PropsOf<typeof chakra.div>

const [ButtonGroupCtxProvider, useButtonGroup] = createContext<ThemingProps>({
  strict: false,
  name: "ButtonGroupContext",
})

export { useButtonGroup }

export const ButtonGroup = (props: ButtonGroupProps) => {
  const { size, colorScheme, variant, ...rest } = props

  const css = {
    "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0 },
    "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
    "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0 },
  }

  return (
    <ButtonGroupCtxProvider value={{ size, colorScheme, variant }}>
      <chakra.div
        display="flex"
        role="group"
        whiteSpace="nowrap"
        sx={css}
        {...rest}
      />
    </ButtonGroupCtxProvider>
  )
}

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}
