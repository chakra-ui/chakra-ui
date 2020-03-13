import { AddIcon } from "@chakra-ui/icons"
import * as React from "react"
import { Tag, TagIcon, TagLabel } from "./Tag"

export default {
  title: "Tag",
}

export const Basic = () => (
  <>
    <Tag variantSize="sm" variantColor="gray">
      Gray
    </Tag>
    <Tag variantColor="gray">Gray</Tag>
    <Tag variantSize="lg" variantColor="gray">
      Gray
    </Tag>
  </>
)

export const VariantColors = () => (
  <>
    <Tag variantSize="sm" variantColor="green">
      Gray
    </Tag>
    <Tag variantColor="pink">Gray</Tag>
    <Tag variantSize="lg" variantColor="blue">
      Gray
    </Tag>
  </>
)

export const LeftIcon = () => (
  <>
    <Tag variantColor="cyan">
      <TagIcon size="12px" as={AddIcon} />
      <TagLabel>Green</TagLabel>
    </Tag>
  </>
)
