import {
  Badge,
  type BadgeProps,
  Stat as ChakraStat,
  FormatNumber,
} from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"
import * as React from "react"

interface StatLabelProps extends ChakraStat.LabelProps {
  info?: React.ReactNode
}

export const StatLabel = React.forwardRef<HTMLDivElement, StatLabelProps>(
  function StatLabel(props, ref) {
    const { info, children, ...rest } = props
    return (
      <ChakraStat.Label {...rest} ref={ref}>
        {children}
        {info && <InfoTip>{info}</InfoTip>}
      </ChakraStat.Label>
    )
  },
)

interface StatValueTextProps extends ChakraStat.ValueTextProps {
  value?: number
  formatOptions?: Intl.NumberFormatOptions
}

export const StatValueText = React.forwardRef<
  HTMLDivElement,
  StatValueTextProps
>(function StatValueText(props, ref) {
  const { value, formatOptions, children, ...rest } = props
  return (
    <ChakraStat.ValueText {...rest} ref={ref}>
      {children ||
        (value != null && <FormatNumber value={value} {...formatOptions} />)}
    </ChakraStat.ValueText>
  )
})

export const StatUpTrend = React.forwardRef<HTMLDivElement, BadgeProps>(
  function StatUpTrend(props, ref) {
    return (
      <Badge colorPalette="green" gap="0" {...props} ref={ref}>
        <ChakraStat.UpIndicator />
        {props.children}
      </Badge>
    )
  },
)

export const StatDownTrend = React.forwardRef<HTMLDivElement, BadgeProps>(
  function StatDownTrend(props, ref) {
    return (
      <Badge colorPalette="red" gap="0" {...props} ref={ref}>
        <ChakraStat.DownIndicator />
        {props.children}
      </Badge>
    )
  },
)

export const StatRoot = ChakraStat.Root
export const StatHelpText = ChakraStat.HelpText
export const StatValueUnit = ChakraStat.ValueUnit
