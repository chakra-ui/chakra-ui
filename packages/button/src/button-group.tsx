import { chakra, PropsOf, ThemingProps, forwardRef } from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"

export type ButtonGroupProps = PropsOf<typeof chakra.div>

const [ButtonGroupContextProvider, useButtonGroup] = createContext<
  ThemingProps
>({
  strict: false,
  name: "ButtonGroupContext",
})

export { useButtonGroup }

export const ButtonGroup = forwardRef<ButtonGroupProps, "div">(
  function ButtonGroup(props, ref) {
    const { size, colorScheme, variant, className, ...rest } = props

    const css = {
      "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0 },
      "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
      "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0 },
    }

    const _className = cx("chakra-button__group", className)

    const context = React.useMemo(() => ({ size, colorScheme, variant }), [
      size,
      colorScheme,
      variant,
    ])

    return (
      <ButtonGroupContextProvider value={context}>
        <chakra.div
          ref={ref}
          display="flex"
          role="group"
          whiteSpace="nowrap"
          __css={css}
          className={_className}
          {...rest}
        />
      </ButtonGroupContextProvider>
    )
  },
)

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}
