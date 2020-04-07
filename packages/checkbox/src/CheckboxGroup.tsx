import * as React from "react"
import { chakra, PropsOf, SystemProps, css, useTheme } from "@chakra-ui/system"
import { useId } from "@chakra-ui/hooks"
import { useCheckboxGroup, UseCheckboxGroupProps } from "./CheckboxGroup.hook"
import {
  getValidChildren,
  omit,
  __DEV__,
  mapResponsive,
} from "@chakra-ui/utils"

export type CheckboxGroupProps = UseCheckboxGroupProps &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "value"> & {
    /**
     * The name of the checkbox group
     */
    name?: string
    /**
     * The space between the children checkboxes
     */
    spacing?: SystemProps["margin"]
    /**
     * The direction to stack the children checkboxes
     */
    direction?: SystemProps["flexDirection"]
  }

/**
 * CheckboxGroup
 *
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 * @see Docs https://chakra-ui.com/checkbox
 *
 */

export const CheckboxGroup = React.forwardRef(
  (props: CheckboxGroupProps, ref: React.Ref<any>) => {
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

    const _name = useId(name, "checkbox")
    const { value, onChange } = useCheckboxGroup(props)

    const childSpacing = mapResponsive(spacing, value => {
      const { margin } = css({ margin: value })(theme)
      return `calc(${margin} / 2)`
    })

    const containerSpacing = mapResponsive(spacing, value => {
      const { margin } = css({ margin: value })(theme)
      return `calc(${margin} / 2 * -1)`
    })

    const validChildren = getValidChildren(children)

    const clones = validChildren.map((child, index) => {
      return (
        <chakra.div key={index} margin={childSpacing}>
          {React.cloneElement(child, {
            size,
            onChange,
            colorScheme,
            name: `${_name}-${index}`,
            isChecked: value.includes(child.props.value),
          })}
        </chakra.div>
      )
    })

    return (
      <chakra.div
        ref={ref}
        role="group"
        display="flex"
        flexWrap="wrap"
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
  CheckboxGroup.displayName = "CheckboxGroup"
}
