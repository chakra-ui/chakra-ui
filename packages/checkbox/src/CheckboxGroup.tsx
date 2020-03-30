import * as React from "react"
import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { useId } from "@chakra-ui/hooks"
import { useCheckboxGroup, CheckboxGroupHookProps } from "./CheckboxGroup.hook"
import { getValidChildren, omit, __DEV__ } from "@chakra-ui/utils"

type CheckboxGroupProps = CheckboxGroupHookProps &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "value"> & {
    name?: string
    isInline?: boolean
    spacing?: SystemProps["margin"]
  }

export const CheckboxGroup = React.forwardRef(
  (props: CheckboxGroupProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      name,
      colorScheme,
      size,
      isInline,
      spacing = 2,
      children,
      ...rest
    } = props

    const _name = useId(name, "checkbox")
    const { value, onChange } = useCheckboxGroup(props)

    const validChildren = getValidChildren(children)

    const clones = validChildren.map((child, index) => {
      const isLastCheckbox = validChildren.length === index + 1
      const spacingProps = isInline ? { mr: spacing } : { mb: spacing }

      return (
        <chakra.div
          key={index}
          display={isInline ? "inline-block" : "block"}
          {...(!isLastCheckbox && spacingProps)}
        >
          {React.cloneElement(child, {
            size,
            colorScheme,
            onChange,
            name: `${_name}-${index}`,
            isChecked: value.includes(child.props.value),
          })}
        </chakra.div>
      )
    })

    return (
      <chakra.div ref={ref} role="group" {...omit(rest, ["onChange"])}>
        {clones}
      </chakra.div>
    )
  },
)

if (__DEV__) {
  CheckboxGroup.displayName = "CheckboxGroup"
}
