import { AddIcon } from "@chakra-ui/icons"
import * as React from "react"
import { Tag, TagIcon, TagLabel, TagCloseButton } from "./Tag"
import { chakra } from "@chakra-ui/system"
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

/**
 * A simple tag component
 */

export const Basic = () => (
  <>
    <Tag>Gray</Tag>
  </>
)

/**
 * Pass the `size` prop to change the size of the tag component
 */

export const Size = () => (
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

/**
 * Pass the `colorScheme` prop to use any color in the theme object to
 * change the background color of the tag component
 */

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

/**
 * Tag component can contain an Icon. This is done by using the `TagIcon` component.
 * Positioning the tag icon can be done by placing it before (left side)
 * or after (right side)the tag component
 */

export const LeftIcon = () => (
  <>
    <Tag colorScheme="cyan">
      <TagIcon size="12px" as={AddIcon} />
      <TagLabel>Green</TagLabel>
    </Tag>
  </>
)

export const RightIcon = () => (
  <>
    <Tag colorScheme="cyan">
      <TagLabel>Green</TagLabel>
      <TagIcon size="12px" as={AddIcon} />
    </Tag>
  </>
)

/**
 * Use the `TagCloseButton` to apply a close button to the tag component.
 */

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

/**
 * Tag component can contain a custom element. This is done by placing the custom element
 * within the tag component.
 */

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
