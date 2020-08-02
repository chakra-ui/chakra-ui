import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"

export type StatLabelProps = PropsOf<typeof chakra.dt>

export const StatLabel = React.forwardRef(function StatLabel(
  props: StatLabelProps,
  ref: React.Ref<any>,
) {
  const styles = useStyles()
  return (
    <chakra.dt
      ref={ref}
      {...props}
      className={cx("chakra-stat__label", props.className)}
      __css={styles.label}
    />
  )
})

if (__DEV__) {
  StatLabel.displayName = "StatLabel"
}

export type StatHelpTextProps = PropsOf<typeof chakra.p>

export const StatHelpText = React.forwardRef(function StatHelpText(
  props: StatHelpTextProps,
  ref: React.Ref<any>,
) {
  const styles = useStyles()

  return (
    <chakra.p
      ref={ref}
      {...props}
      className={cx("chakra-stat__help-text", props.className)}
      __css={styles.helpText}
    />
  )
})

if (__DEV__) {
  StatHelpText.displayName = "StatHelpText"
}

export type StatNumberProps = PropsOf<typeof chakra.dd>

export const StatNumber = React.forwardRef(function StatNumber(
  props: StatNumberProps,
  ref: React.Ref<any>,
) {
  const styles = useStyles()
  return (
    <chakra.dd
      ref={ref}
      {...props}
      className={cx("chakra-stat__number", props.className)}
      __css={styles.number}
    />
  )
})

if (__DEV__) {
  StatNumber.displayName = "StatNumber"
}

export function StatDownArrow(props: IconProps) {
  return (
    <Icon color="red.400" {...props}>
      <path
        fill="currentColor"
        d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
      />
    </Icon>
  )
}

if (__DEV__) {
  StatDownArrow.displayName = "StatDownArrow"
}

export const StatUpArrow = (props: IconProps) => (
  <Icon color="green.400" {...props}>
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

export function StatArrow(props: StatArrowProps) {
  const { type, "aria-label": ariaLabel, ...rest } = props
  const styles = useStyles()

  const IconComponent = type === "increase" ? StatUpArrow : StatDownArrow
  const defaultAriaLabel = type === "increase" ? "increased by" : "decreased by"
  const label = ariaLabel || defaultAriaLabel

  return (
    <>
      <VisuallyHidden>{label}</VisuallyHidden>
      <IconComponent aria-hidden {...rest} __css={styles.icon} />
    </>
  )
}

if (__DEV__) {
  StatArrow.displayName = "StatArrow"
}

export type StatProps = PropsOf<typeof chakra.div> & ThemingProps

export const Stat = React.forwardRef(function Stat(
  props: StatProps,
  ref: React.Ref<any>,
) {
  const styles = useMultiStyleConfig("Stat", props)
  const { className, children, ...rest } = omitThemingProps(props)

  return (
    <StylesProvider value={styles}>
      <chakra.div className={cx("chakra-stat", className)} ref={ref} {...rest}>
        <dl>{children}</dl>
      </chakra.div>
    </StylesProvider>
  )
})

if (__DEV__) {
  Stat.displayName = "Stat"
}

export const StatGroup = React.forwardRef(function StatGroup(
  props: PropsOf<typeof chakra.div>,
  ref: React.Ref<any>,
) {
  return (
    <chakra.div
      {...props}
      ref={ref}
      role="group"
      className={cx("chakra-stat__group", props.className)}
      __css={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    />
  )
})

if (__DEV__) {
  StatGroup.displayName = "StatGroup"
}
