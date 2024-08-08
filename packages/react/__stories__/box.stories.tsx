import { BoxBasic } from "compositions/examples/box-basic"
import { BoxPropertyCard } from "compositions/examples/box-property-card"
import { BoxWithAsProp } from "compositions/examples/box-with-as-prop"
import { BoxWithBorder } from "compositions/examples/box-with-border"
import { BoxWithHideBelow } from "compositions/examples/box-with-hide-below"
import { BoxWithHideFrom } from "compositions/examples/box-with-hide-from"
import { BoxWithPseudoProps } from "compositions/examples/box-with-pseudo-props"
import { BoxWithShadow } from "compositions/examples/box-with-shadow"

export default {
  title: "Layout / Box",
}

export const Basic = () => {
  return <BoxBasic />
}

export const PseudoProps = () => {
  return <BoxWithPseudoProps />
}

export const HideBelow = () => {
  return <BoxWithHideBelow />
}

export const HideFrom = () => {
  return <BoxWithHideFrom />
}

export const WithShadow = () => {
  return <BoxWithShadow />
}

export const WithBorder = () => {
  return <BoxWithBorder />
}

export const AsProp = () => {
  return <BoxWithAsProp />
}

export const Composition = () => {
  return <BoxPropertyCard />
}
