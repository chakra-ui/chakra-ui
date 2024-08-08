import { TagBasic } from "compositions/examples/tag-basic"
import { TagSizeTable } from "compositions/examples/tag-size-table"
import { TagVariantTable } from "compositions/examples/tag-variant-table"
import { TagWithAvatar } from "compositions/examples/tag-with-avatar"
import { TagWithClose } from "compositions/examples/tag-with-close"
import { TagWithColors } from "compositions/examples/tag-with-colors"
import { TagWithOverflow } from "compositions/examples/tag-with-overflow"
import { Box } from "../src"

export default {
  title: "Components / Tag",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Basic = () => {
  return <TagBasic />
}

export const WithAvatar = () => {
  return <TagWithAvatar />
}

export const WithClose = () => {
  return <TagWithClose />
}

export const WithColors = () => {
  return <TagWithColors />
}

export const Variants = () => {
  return <TagVariantTable />
}

export const Sizes = () => {
  return <TagSizeTable />
}

export const Overflow = () => {
  return <TagWithOverflow />
}
