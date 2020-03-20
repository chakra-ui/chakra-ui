import { AddIcon } from "@chakra-ui/icons"
import * as React from "react"
import { Tag, TagIcon, TagLabel, TagCloseButton } from "./Tag"
import { chakra } from "@chakra-ui/system"
import { Avatar } from "@chakra-ui/avatar"

export default {
  title: "Tag",
  decorators: [
    story => (
      <chakra.div maxW="600px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
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

export const WithCloseButton = () => (
  <>
    <Tag variant="solid" variantSize="sm" variantColor="cyan">
      <TagLabel>Tab Label</TagLabel>
      <TagCloseButton />
    </Tag>

    <Tag variant="solid" variantSize="md" variantColor="cyan">
      <TagLabel>Tab Label</TagLabel>
      <TagCloseButton />
    </Tag>

    <Tag variant="solid" variantSize="lg" variantColor="cyan">
      <TagLabel>Tab Label</TagLabel>
      <TagCloseButton />
    </Tag>
  </>
)

export const WithCustomElement = () => (
  <Tag variantSize="lg" variantColor="red" borderRadius="full">
    <Avatar
      src="https://bit.ly/sage-adebayo"
      variantSize="xs"
      name="Segun Adebayo"
      ml={-1}
      mr={2}
    />
    <TagLabel>Segun</TagLabel>
    <TagCloseButton />
  </Tag>
)
