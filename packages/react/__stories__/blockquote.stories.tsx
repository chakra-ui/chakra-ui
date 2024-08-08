import { BlockquoteBasic } from "compositions/examples/blockquote-basic"
import { BlockquoteVariantTable } from "compositions/examples/blockquote-variant-table"
import { BlockquoteWithCite } from "compositions/examples/blockquote-with-cite"
import { BlockquoteWithCustomIcon } from "compositions/examples/blockquote-with-custom-icon"
import { BlockquoteWithIcon } from "compositions/examples/blockquote-with-icon"

export default {
  title: "Components / Blockquote",
}

export const Basic = () => {
  return <BlockquoteBasic />
}

export const WithCite = () => {
  return <BlockquoteWithCite />
}

export const WithIcon = () => {
  return <BlockquoteWithIcon />
}

export const WithCustomIcon = () => {
  return <BlockquoteWithCustomIcon />
}

export const Variants = () => {
  return <BlockquoteVariantTable />
}
