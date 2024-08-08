import { BleedBasic } from "compositions/examples/bleed-basic"
import { BleedVertical } from "compositions/examples/bleed-vertical"
import { BleedWithDirection } from "compositions/examples/bleed-with-direction"

export default {
  title: "Layout / Bleed",
}

export const Basic = () => {
  return <BleedBasic />
}

export const Vertical = () => {
  return <BleedVertical />
}

export const WithDirection = () => {
  return <BleedWithDirection />
}
