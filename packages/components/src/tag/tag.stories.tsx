import { HiPlus } from "react-icons/hi"
import { MdSettings } from "react-icons/md"
import { Tag } from "."
import { Avatar } from "../avatar"
import { chakra } from "../system"
import { For, HStack } from ".."

export default {
  title: "Components / Data Display / Tag",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="600px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => <Tag.Root colorScheme="teal">Teal</Tag.Root>

export const withSizes = () => (
  <HStack>
    <For each={["sm", "md", "lg"]}>
      {(size) => (
        <Tag.Root key={size} size={size}>
          Gray
        </Tag.Root>
      )}
    </For>
  </HStack>
)

export const colorSchemes = () => (
  <HStack>
    <Tag.Root size="sm" colorScheme="green">
      Gray
    </Tag.Root>
    <Tag.Root size="md" colorScheme="pink">
      Gray
    </Tag.Root>
    <Tag.Root size="lg" colorScheme="blue">
      Gray
    </Tag.Root>
  </HStack>
)

export const withLeftIcon = () => (
  <Tag.Root colorScheme="cyan">
    <Tag.StartIcon w="12px" h="12px" asChild>
      <HiPlus />
    </Tag.StartIcon>
    <Tag.Label>Green</Tag.Label>
  </Tag.Root>
)

export const withRightIcon = () => (
  <>
    <Tag.Root colorScheme="cyan">
      <Tag.Label>Green</Tag.Label>
      <Tag.EndIcon w="12px" h="12px" asChild>
        <HiPlus />
      </Tag.EndIcon>
    </Tag.Root>

    <Tag.Root variant="solid" colorScheme="teal">
      <Tag.Label>Teal</Tag.Label>
      <Tag.EndIcon as={MdSettings} />
    </Tag.Root>
  </>
)

export const withCloseButton = () => (
  <>
    <Tag.Root variant="solid" size="sm" colorScheme="cyan">
      <Tag.Label>Tab Label</Tag.Label>
      <Tag.CloseButton />
    </Tag.Root>

    <Tag.Root variant="solid" size="md" colorScheme="cyan">
      <Tag.Label>Tab Label</Tag.Label>
      <Tag.CloseButton />
    </Tag.Root>

    <Tag.Root variant="solid" size="lg" colorScheme="cyan">
      <Tag.Label>Tab Label</Tag.Label>
      <Tag.CloseButton />
    </Tag.Root>
  </>
)

export const withCustomElement = () => (
  <Tag.Root size="lg" colorScheme="red" borderRadius="full">
    <Avatar.Root
      src="https://bit.ly/sage-adebayo"
      size="xs"
      name="Segun Adebayo"
      marginLeft={-1}
      marginRight={2}
    >
      <Avatar.Image />
      <Avatar.Fallback />
    </Avatar.Root>
    <Tag.Label>Segun</Tag.Label>
    <Tag.CloseButton />
  </Tag.Root>
)
