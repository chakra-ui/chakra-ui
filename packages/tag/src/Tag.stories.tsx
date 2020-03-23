import { AddIcon } from "@chakra-ui/icons"
import * as React from "react"
import { Tag, TagIcon, TagLabel, TagCloseButton } from "./Tag"
import { chakra } from "@chakra-ui/styled"
import { Avatar } from "@chakra-ui/avatar"

export default {
  title: "Tag",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="600px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <>
    <Tag size="sm" colorScheme="gray">
      Gray
    </Tag>
    <Tag colorScheme="gray">Gray</Tag>
    <Tag size="lg" colorScheme="gray">
      Gray
    </Tag>
  </>
)

export const colorSchemes = () => (
  <>
    <Tag size="sm" colorScheme="green">
      Gray
    </Tag>
    <Tag colorScheme="pink">Gray</Tag>
    <Tag size="lg" colorScheme="blue">
      Gray
    </Tag>
  </>
)

export const LeftIcon = () => (
  <>
    <Tag colorScheme="cyan">
      <TagIcon size="12px" as={AddIcon} />
      <TagLabel>Green</TagLabel>
    </Tag>
  </>
)

export const WithCloseButton = () => (
  <>
    <Tag variant="solid" size="sm" colorScheme="cyan">
      <TagLabel>Tab Label</TagLabel>
      <TagCloseButton />
    </Tag>

    <Tag variant="solid" size="md" colorScheme="cyan">
      <TagLabel>Tab Label</TagLabel>
      <TagCloseButton />
    </Tag>

    <Tag variant="solid" size="lg" colorScheme="cyan">
      <TagLabel>Tab Label</TagLabel>
      <TagCloseButton />
    </Tag>
  </>
)

export const WithCustomElement = () => (
  <Tag size="lg" colorScheme="red" borderRadius="full">
    <Avatar
      src="https://bit.ly/sage-adebayo"
      size="xs"
      name="Segun Adebayo"
      ml={-1}
      mr={2}
    />
    <TagLabel>Segun</TagLabel>
    <TagCloseButton />
  </Tag>
)
