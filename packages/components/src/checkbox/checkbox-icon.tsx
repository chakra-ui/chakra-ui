import { chakra, HTMLChakraProps, PropsOf } from "../system"

function CheckIcon(props: PropsOf<typeof chakra.svg>) {
  return (
    <chakra.svg
      width="1.2em"
      viewBox="0 0 12 10"
      style={{
        fill: "none",
        strokeWidth: 2,
        stroke: "currentColor",
        strokeDasharray: 16,
      }}
      {...props}
    >
      <polyline points="1.5 6 4.5 9 10.5 1" />
    </chakra.svg>
  )
}

function IndeterminateIcon(props: PropsOf<typeof chakra.svg>) {
  return (
    <chakra.svg
      width="1.2em"
      viewBox="0 0 24 24"
      style={{ stroke: "currentColor", strokeWidth: 4 }}
      {...props}
    >
      <line x1="21" x2="3" y1="12" y2="12" />
    </chakra.svg>
  )
}

export interface CheckboxIconProps extends HTMLChakraProps<"svg"> {
  /**
   * @default false
   */
  indeterminate?: boolean
  /**
   * @default false
   */
  checked?: boolean
}

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 *
 * @todo allow users pass their own icon svgs
 */
export function CheckboxIcon(props: CheckboxIconProps) {
  const { indeterminate, checked, ...rest } = props
  const BaseIcon = indeterminate ? IndeterminateIcon : CheckIcon

  return checked || indeterminate ? (
    <chakra.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <BaseIcon {...rest} />
    </chakra.div>
  ) : null
}
