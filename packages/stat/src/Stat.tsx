import * as React from "react"
import { chakra } from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"
import { __DEV__ } from "@chakra-ui/utils"

export const StatLabel = chakra("p", {
  themeKey: "Stat.Label",
  baseStyle: {
    fontWeight: "medium",
    fontSize: "sm",
  },
})

if (__DEV__) {
  StatLabel.displayName = "StatLabel"
}

export const StatHelpText = chakra("p", {
  themeKey: "Stat.HelpText",
  baseStyle: {
    fontSize: "sm",
    opacity: 0.8,
    marginBottom: 2,
  },
})

if (__DEV__) {
  StatHelpText.displayName = "StatHelpText"
}

export const StatNumber = chakra("p", {
  themeKey: "Stat.Number",
  baseStyle: {
    fontSize: "2xl",
    verticalAlign: "baseline",
    fontWeight: "semibold",
  },
})

if (__DEV__) {
  StatNumber.displayName = "StatNumber"
}

export const StatDownArrow = (props: IconProps) => (
  <Icon mr={1} size="14px" color="red.400" verticalAlign="middle" {...props}>
    <path
      fill="currentColor"
      d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
    />
  </Icon>
)

if (__DEV__) {
  StatDownArrow.displayName = "StatDownArrow"
}

export const StatUpArrow = (props: IconProps) => (
  <Icon mr={1} size="14px" color="green.400" verticalAlign="middle" {...props}>
    <path
      fill="currentColor"
      d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
    />
  </Icon>
)

if (__DEV__) {
  StatUpArrow.displayName = "StatUpArrow"
}

export type StatArrowProps = IconProps & {
  /**
   * Type of the stat arrow
   */
  type?: "increase" | "decrease"
}

export function StatArrow(props: StatArrowProps) {
  const { type, ...rest } = props
  return type === "increase" ? (
    <StatUpArrow {...rest} />
  ) : (
    <StatDownArrow {...rest} />
  )
}

if (__DEV__) {
  StatArrow.displayName = "StatArrow"
}

export const Stat = chakra("div", {
  themeKey: "Stat.Root",
  baseStyle: {
    flex: "1",
    paddingRight: 4,
  },
})

if (__DEV__) {
  Stat.displayName = "Stat"
}

export const StatGroup = chakra("div", {
  baseStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
})

if (__DEV__) {
  StatGroup.displayName = "StatGroup"
}
