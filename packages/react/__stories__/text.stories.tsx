import { TextBasic } from "compositions/examples/text-basic"
import { TextWithAsProp } from "compositions/examples/text-with-as-prop"
import { TextWithLineClamp } from "compositions/examples/text-with-line-clamp"
import { TextWithSizes } from "compositions/examples/text-with-sizes"
import { TextWithTruncate } from "compositions/examples/text-with-truncate"
import { TextWithWeights } from "compositions/examples/text-with-weights"

export default {
  title: "Typography / Text",
}

export const Basic = () => {
  return <TextBasic />
}

export const AsProps = () => {
  return <TextWithAsProp />
}

export const Truncate = () => {
  return <TextWithTruncate />
}

export const LineClamp = () => {
  return <TextWithLineClamp />
}

export const Sizes = () => {
  return <TextWithSizes />
}

export const Weights = () => {
  return <TextWithWeights />
}
