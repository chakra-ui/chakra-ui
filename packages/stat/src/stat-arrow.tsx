import { type IconProps, Icon } from "@chakra-ui/icon"
import { chakra } from "@chakra-ui/system"

import { useStatStyles } from "./stat"

export const StatDownArrow: React.FC<IconProps> = (props) => (
  <Icon color="red.400" {...props}>
    <path
      fill="currentColor"
      d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
    />
  </Icon>
)

StatDownArrow.displayName = "StatDownArrow"

export function StatUpArrow(props: IconProps) {
  return (
    <Icon color="green.400" {...props}>
      <path
        fill="currentColor"
        d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
      />
    </Icon>
  )
}

StatUpArrow.displayName = "StatUpArrow"

export interface StatArrowProps extends IconProps {
  type?: "increase" | "decrease"
}

export function StatArrow(props: StatArrowProps) {
  const { type, "aria-label": ariaLabel, ...rest } = props
  const styles = useStatStyles()

  const BaseIcon = type === "increase" ? StatUpArrow : StatDownArrow
  const defaultAriaLabel = type === "increase" ? "increased by" : "decreased by"
  const label = ariaLabel || defaultAriaLabel

  return (
    <>
      <chakra.span srOnly>{label}</chakra.span>
      <BaseIcon aria-hidden {...rest} __css={styles.icon} />
    </>
  )
}

StatArrow.displayName = "StatArrow"
