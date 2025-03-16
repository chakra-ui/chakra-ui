import { For, HStack, Stack, Tag } from "@chakra-ui/react"
import { HiCheck } from "react-icons/hi"

export const TagWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <HStack key={size}>
            <Tag.Root size={size}>
              <Tag.Label>Gray</Tag.Label>
            </Tag.Root>
            <Tag.Root size={size}>
              <Tag.Label>Gray</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger />
              </Tag.EndElement>
            </Tag.Root>
            <Tag.Root size={size}>
              <Tag.Label>Gray</Tag.Label>
              <Tag.EndElement>
                <HiCheck />
              </Tag.EndElement>
            </Tag.Root>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
