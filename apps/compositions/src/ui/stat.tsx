import {
  Badge,
  type BadgeProps,
  Stat as ChakraStat,
  FormatNumber,
  IconButton,
} from "@chakra-ui/react"
import { ToggleTip } from "compositions/ui/toggle-tip"
import { HiOutlineInformationCircle } from "react-icons/hi"

interface StatLabelProps extends ChakraStat.LabelProps {
  info?: React.ReactNode
}

export const StatLabel = (props: StatLabelProps) => {
  const { info, children, ...rest } = props
  return (
    <ChakraStat.Label {...rest}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant="ghost" aria-label="info" size="xs">
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraStat.Label>
  )
}

interface StatValueTextProps extends ChakraStat.ValueTextProps {
  value?: number
  formatOptions?: Intl.NumberFormatOptions
}

export const StatValueText = (props: StatValueTextProps) => {
  const { value, formatOptions, children, ...rest } = props
  return (
    <ChakraStat.ValueText {...rest}>
      {children ||
        (value != null && (
          <FormatNumber value={value} {...props.formatOptions} />
        ))}
    </ChakraStat.ValueText>
  )
}

export const StatUpTrend = (props: BadgeProps) => {
  return (
    <Badge colorPalette="green" gap="0" {...props}>
      <ChakraStat.UpIndicator />
      {props.children}
    </Badge>
  )
}

export const StatDownTrend = (props: BadgeProps) => {
  return (
    <Badge colorPalette="red" gap="0" {...props}>
      <ChakraStat.DownIndicator />
      {props.children}
    </Badge>
  )
}

export const StatRoot = ChakraStat.Root
export const StatHelpText = ChakraStat.HelpText
export const StatValueUnit = ChakraStat.ValueUnit
