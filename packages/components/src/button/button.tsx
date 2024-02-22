import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx, dataAttr } from "@chakra-ui/utils"
import { chakra, forwardRef, HTMLChakraProps, useStyleConfig } from "../system"
import { useButtonGroup } from "./button-context"
import { ButtonOptions } from "./button-types"

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps<"Button"> {}

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.
 *
 * @see Docs https://chakra-ui.com/docs/components/button
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const Button = forwardRef<ButtonProps, "button">((props, ref) => {
  const group = useButtonGroup()
  const styles = useStyleConfig("Button", { ...group, ...props })

  const {
    isDisabled = group?.isDisabled,
    isActive,
    type,
    className,
    as,
    ...rest
  } = omitThemingProps(props)

  return (
    <chakra.button
      ref={ref}
      as={as}
      type="button"
      data-in-group={dataAttr(!!group)}
      data-active={dataAttr(isActive)}
      __css={styles}
      disabled={isDisabled}
      {...rest}
      className={cx("chakra-button", className)}
    />
  )
})

Button.displayName = "Button"
