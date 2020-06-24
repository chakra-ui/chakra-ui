import {
  chakra,
  PropsOf,
  ThemingProps,
  SystemProps,
  CSSObject,
} from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"

export type ButtonGroupProps = PropsOf<typeof chakra.div> & {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean
  /**
   * The spacing between the buttons
   * @default '0.5rem'
   */
  spacing?: SystemProps["marginRight"]
}

const [ButtonGroupContextProvider, useButtonGroup] = createContext<
  ThemingProps
>({
  strict: false,
  name: "ButtonGroupContext",
})

export { useButtonGroup }

export const ButtonGroup = React.forwardRef(function ButtonGroup(
  props: ButtonGroupProps,
  ref: React.Ref<any>,
) {
  const {
    size,
    colorScheme,
    variant,
    className,
    spacing = "0.5rem",
    isAttached,
    ...rest
  } = props

  const css = isAttached
    ? {
        "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0 },
        "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
        "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0 },
      }
    : {
        "& > *:not(style) ~ *:not(style)": { marginLeft: spacing },
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
        role="group"
        display="inline-flex"
        __css={css as CSSObject}
        className={_className}
        {...rest}
      />
    </ButtonGroupContextProvider>
  )
})

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}
