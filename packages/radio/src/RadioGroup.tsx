import * as React from "react"
import {
  __DEV__,
  getValidChildren,
  mapResponsive,
  omit,
} from "@chakra-ui/utils"
import { useRadioGroup, UseRadioGroupProps } from "./RadioGroup.hook"
import { chakra, useTheme, css, SystemProps, PropsOf } from "@chakra-ui/system"

export type RadioGroupProps = UseRadioGroupProps &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "value"> & {
    /**
     * The name of the radio group
     */
    name?: string
    /**
     * The space between the children radios
     */
    spacing?: SystemProps["margin"]
    /**
     * The direction to stack the children radios
     */
    direction?: SystemProps["flexDirection"]
  }

/**
 * RadioGroup
 *
 * Used for multiple radios which are bound in one group,
 * and it indicates which option is selected.
 *
 * @see Docs https://chakra-ui.com/radio
 *
 */

export const RadioGroup = React.forwardRef(
  (props: RadioGroupProps, ref: React.Ref<any>) => {
    const {
      name,
      colorScheme,
      size,
      spacing = 2,
      direction = "row",
      children,
      ...rest
    } = props

    const theme = useTheme()

    const validChildren = getValidChildren(children)

    const { getRootProps, getRadioProps } = useRadioGroup({ ...props, ref })

    const childSpacing = mapResponsive(spacing, value => {
      const { margin } = css({ margin: value })(theme)
      return `calc(${margin} / 2)`
    })

    const containerSpacing = mapResponsive(spacing, value => {
      const { margin } = css({ margin: value })(theme)
      return `calc(${margin} / 2 * -1)`
    })

    const clones = validChildren.map((child, index) => {
      return (
        <chakra.div key={index} margin={childSpacing}>
          {React.cloneElement(child, getRadioProps(child.props))}
        </chakra.div>
      )
    })

    return (
      <chakra.div
        display="flex"
        flexWrap="wrap"
        role="radiogroup"
        {...getRootProps()}
        flexDirection={direction}
        margin={containerSpacing}
        {...omit(rest, ["onChange"])}
      >
        {clones}
      </chakra.div>
    )
  },
)

if (__DEV__) {
  RadioGroup.displayName = "RadioGroup"
}
