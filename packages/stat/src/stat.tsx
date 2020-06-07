import * as React from "react"
import {
  chakra,
  PropsOf,
  forwardRef,
  ThemingProvider,
  useThemingContext,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"
import { __DEV__, cx } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"

/**
 * Learn the Semantic HTML for stats:
 * @see Post https://www.bitdegree.org/learn/html-dl
 */

const StyledLabel = chakra("dt", {
  themeKey: "Stat.Label",
})

export type StatLabelProps = PropsOf<typeof StyledLabel>

/**
 * StatLabel - Theming
 *
 * The label for the stat card. This is usually the heading for the card.
 *
 * To style the StatLabel globally, change the styles in
 * `theme.components.Stat` under the `Label` key.
 */
export const StatLabel = forwardRef<StatLabelProps, "dt">(
  function StatLabel(props, ref) {
    const { className, ...rest } = props
    const theming = useThemingContext()
    const _className = cx("chakra-stat__label", className)
    return (
      <StyledLabel ref={ref} className={_className} {...theming} {...rest} />
    )
  },
)

if (__DEV__) {
  StatLabel.displayName = "StatLabel"
}

/**
 * StatHelpText
 *
 * Additional context and information about the stat.
 *
 * To style the StatHelpText globally, change the styles in
 * `theme.components.Stat.HelpText`
 */
const StyledHelpText = chakra("p", {
  themeKey: "Stat.HelpText",
})

export type StatHelpTextProps = PropsOf<typeof StyledHelpText>

export const StatHelpText = forwardRef<StatHelpTextProps, "p">(
  function StatHelpText(props, ref) {
    const { className, ...rest } = props
    const theming = useThemingContext()
    const _className = cx("chakra-stat__help-text", className)
    return (
      <StyledHelpText ref={ref} className={_className} {...theming} {...rest} />
    )
  },
)

if (__DEV__) {
  StatHelpText.displayName = "StatHelpText"
}

/**
 * StatNumber
 *
 * Numerical value representation of the stat.
 *
 *To style the StatNumber globally, change the styles in
 * `theme.components.Stat.Number`
 */

export const StyledNumber = chakra("dd", {
  themeKey: "Stat.Number",
})

export type StatNumberProps = PropsOf<typeof StyledNumber>

export const StatNumber = forwardRef<StatNumberProps, "dd">(
  function StatNumber(props, ref) {
    const { className, ...rest } = props
    const theming = useThemingContext()
    const _className = cx("chakra-stat__number", className)
    return (
      <StyledNumber ref={ref} className={_className} {...theming} {...rest} />
    )
  },
)

if (__DEV__) {
  StatNumber.displayName = "StatNumber"
}

/**
 * StatDownArrow
 *
 * Indicator arrow to show a decrease in the stat.
 */

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

/**
 * StatUpArrow
 *
 * Indicator arrow to show an increase in the stat.
 */

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
  type?: "increase" | "decrease"
}

/**
 * StatArrow
 *
 * Indicator arrow to show an increase or a decrease in the stat.
 */

export function StatArrow(props: StatArrowProps) {
  const { type, "aria-label": ariaLabel, ...rest } = props

  const Icon = type === "increase" ? StatUpArrow : StatDownArrow
  const defaultAriaLabel = type === "increase" ? "increased by" : "decreased by"

  const label = ariaLabel || defaultAriaLabel

  return (
    <React.Fragment>
      <VisuallyHidden children={label} />
      <Icon aria-hidden {...rest} />
    </React.Fragment>
  )
}

if (__DEV__) {
  StatArrow.displayName = "StatArrow"
}

/**
 * Stat
 *
 * A component to display statistic numbers.
 *
 * To style the Stat globally, change the styles in
 * `theme.components.Stat.Root`
 */

const StyledStat = chakra("div", {
  baseStyle: {
    flex: "1",
    paddingRight: 4,
  },
})

export type StatProps = PropsOf<typeof StyledStat>

export const Stat = forwardRef<StatProps, "div">(
  function Stat(props, ref) {
    const defaults = useThemeDefaultProps("Stat")
    const {
      size = defaults?.size,
      variant = defaults?.variant,
      colorScheme = defaults?.colorScheme,
      className,
      children,
      ...rest
    } = props

    const theming = { size, variant, colorScheme }

    const _className = cx("chakra-stat", className)

    return (
      <ThemingProvider value={theming}>
        <StyledStat className={_className} ref={ref} {...rest}>
          <dl>{children}</dl>
        </StyledStat>
      </ThemingProvider>
    )
  },
)

if (__DEV__) {
  Stat.displayName = "Stat"
}

/**
 * StatGroup
 *
 * The component to group multiple stats together
 */

export const StatGroup = chakra("div", {
  baseStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  attrs: { role: "group" },
})

if (__DEV__) {
  StatGroup.displayName = "StatGroup"
}
