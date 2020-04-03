import {
  PropsOf,
  ThemingProps,
  chakra,
  useComponentDefaults,
  layoutPropNames,
} from "@chakra-ui/system"
import * as React from "react"
import { RadioHookProps, useRadio } from "./Radio.hook"
import { split } from "@chakra-ui/utils"

const StyledRadio = chakra("div", {
  themeKey: "Radio",
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
})

export type RadioProps = RadioHookProps &
  ThemingProps &
  Omit<PropsOf<typeof StyledRadio>, "onChange" | "defaultChecked">

/**
 * Radio
 *
 * Radio component is used in forms when a user needs to select a single value from
 * several options.
 *
 * @see Docs https://chakra-ui.com/radio
 */

export const Radio = React.forwardRef(
  (props: RadioProps, ref: React.Ref<HTMLInputElement>) => {
    const defaults = useComponentDefaults("Radio")

    const {
      colorScheme = "blue",
      variant = defaults?.variant,
      size = defaults?.size,
      children,
      ...radioProps
    } = props

    const themingProps = { variant, colorScheme, size }

    const { getInputProps, getCheckboxProps, htmlProps: rest } = useRadio(
      radioProps,
    )

    const [rootStyles, radioStyles] = split(rest, layoutPropNames as any)

    // Prevent onBlur being fired when the checkbox label is clicked
    const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }

    // Prevent onBlur being fired when the checkbox label is touched
    const handleTouchStart = (event: React.TouchEvent<HTMLInputElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }

    return (
      <chakra.label
        display="inline-flex"
        alignItems="center"
        verticalAlign="top"
        {...rootStyles}
      >
        <input {...getInputProps({ ref })} />
        <StyledRadio
          {...themingProps}
          {...radioStyles}
          {...getCheckboxProps()}
        />
        {children && (
          <chakra.div
            marginLeft="0.5rem"
            fontSize={size}
            userSelect="none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            opacity={props.isDisabled ? 0.4 : 1}
          >
            {children}
          </chakra.div>
        )}
      </chakra.label>
    )
  },
)
