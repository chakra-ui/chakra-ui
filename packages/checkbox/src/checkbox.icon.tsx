import * as React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"
import { omit } from "@chakra-ui/utils"

export interface CheckboxIconProps extends IconProps {
  isChecked?: boolean
  isIndeterminate?: boolean
}

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 *
 * @todo allow users pass their own icon svgs
 */
export const CheckboxIcon: React.FC<CheckboxIconProps> = (props) => {
  const { isIndeterminate } = props
  const iconProps = omit(props, ["isChecked", "isIndeterminate"])
  return (
    <Icon {...iconProps}>
      {isIndeterminate ? (
        <rect fill="currentColor" height="4" width="20" x="2" y="10" />
      ) : (
        <polygon
          fill="currentColor"
          points="9 21 1 13 4 10 9 15 21 3 24 6 9 21"
        />
      )}
    </Icon>
  )
}
