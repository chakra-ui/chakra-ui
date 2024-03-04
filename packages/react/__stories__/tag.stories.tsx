import { HiPlus } from "react-icons/hi"
import { For, HStack, Icon } from "../src"
import { Avatar } from "../src/components/avatar"
import { Tag } from "../src/components/tag"
import { chakra } from "../src/styled-system"

export default {
  title: "Data Display / Tag",
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

export const WithStartIcon = () => (
  <Tag.Root colorScheme="cyan">
    <Icon as={HiPlus} w="12px" h="12px" />
    <Tag.Label>Green</Tag.Label>
  </Tag.Root>
)

export const WithEndIcon = () => (
  <Tag.Root colorScheme="cyan">
    <Tag.Label>Green</Tag.Label>
    <Icon as={HiPlus} w="12px" h="12px" />
  </Tag.Root>
)

export const WithCloseTrigger = () => (
  <>
    <Tag.Root variant="solid" size="sm" colorScheme="cyan">
      <Tag.Label>Tab Label</Tag.Label>
      <Tag.CloseTrigger />
    </Tag.Root>

    <Tag.Root variant="solid" size="md" colorScheme="cyan">
      <Tag.Label>Tab Label</Tag.Label>
      <Tag.CloseTrigger />
    </Tag.Root>

    <Tag.Root variant="solid" size="lg" colorScheme="cyan">
      <Tag.Label>Tab Label</Tag.Label>
      <Tag.CloseTrigger />
    </Tag.Root>
  </>
)

export const WithCustomElement = () => (
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
    <Tag.CloseTrigger />
  </Tag.Root>
)
