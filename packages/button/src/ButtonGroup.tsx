import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { forwardRef, Ref } from "react"

export type ButtonGroupProps = PropsOf<typeof chakra.div>

const [ButtonGroupCtxProvider, useButtonGroup] = createContext<ThemingProps>({
  strict: false,
  name: "ButtonGroupContext",
})

export { useButtonGroup }

export const ButtonGroup = forwardRef(
  (props: ButtonGroupProps, ref: Ref<any>) => {
    const { size, colorScheme, variant, className, ...rest } = props

    const css = {
      "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0 },
      "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
      "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0 },
    }

    const _className = cx("chakra-button__group", className)

    return (
      <ButtonGroupCtxProvider value={{ size, colorScheme, variant }}>
        <chakra.div
          ref={ref}
          display="flex"
          role="group"
          whiteSpace="nowrap"
          sx={css}
          className={_className}
          {...rest}
        />
      </ButtonGroupCtxProvider>
    )
  },
)

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}
