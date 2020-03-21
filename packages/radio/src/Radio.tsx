import {
  createChakra,
  PropsOf,
  ThemingProps,
  chakra,
  useComponentDefaults,
  layoutPropNames,
} from "@chakra-ui/system"
import * as React from "react"
import { RadioHookProps, useRadio } from "./Radio.hook"
import { split } from "@chakra-ui/utils"

const StyledRadio = createChakra("div", {
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

export const Radio = React.forwardRef(
  (props: RadioProps, ref: React.Ref<HTMLInputElement>) => {
    const defaults = useComponentDefaults("Radio")

    const {
      variantColor = "blue",
      variant = defaults.variant,
      variantSize = defaults.variantSize,
      children,
      ...radioProps
    } = props

    const themingProps = { variant, variantColor, variantSize }

    const { getInputProps, getCheckboxProps, htmlProps: rest } = useRadio(
      radioProps,
    )

    const [rootStyles, radioStyles] = split(rest, layoutPropNames as any)

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
            fontSize={variantSize}
            userSelect="none"
            opacity={props.isDisabled ? 0.4 : 1}
          >
            {children}
          </chakra.div>
        )}
      </chakra.label>
    )
  },
)
