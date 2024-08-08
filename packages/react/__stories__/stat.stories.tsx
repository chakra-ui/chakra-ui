import { StatBasic } from "compositions/examples/stat-basic"
import { StatWithFormatOptions } from "compositions/examples/stat-with-format-options"
import { StatWithIcon } from "compositions/examples/stat-with-icon"
import { StatWithIndicator } from "compositions/examples/stat-with-indicator"
import { StatWithInfoTip } from "compositions/examples/stat-with-info-tip"
import { StatWithProgressBar } from "compositions/examples/stat-with-progress-bar"
import { StatWithTrend } from "compositions/examples/stat-with-trend"
import { StatWithValueUnit } from "compositions/examples/stat-with-value-unit"

export default {
  title: "Components / Stat",
}

export const Basic = () => {
  return <StatBasic />
}

export const WithFormatOptions = () => {
  return <StatWithFormatOptions />
}

export const WithIcon = () => {
  return <StatWithIcon />
}

export const WithIndicator = () => {
  return <StatWithIndicator />
}

export const WithInfoTip = () => {
  return <StatWithInfoTip />
}

export const WithProgressBar = () => {
  return <StatWithProgressBar />
}

export const WithTrend = () => {
  return <StatWithTrend />
}

export const WithValueUnit = () => {
  return <StatWithValueUnit />
}
