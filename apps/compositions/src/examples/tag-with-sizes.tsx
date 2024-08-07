import { For, HStack, Stack } from "@chakra-ui/react"
import { Tag } from "compositions/ui/tag"
import { HiCheck } from "react-icons/hi"

export const TagWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["sm", "md", "lg"]}>
        {(v) => (
          <HStack>
            <Tag size={v}>Gray</Tag>
            <Tag size={v} closable>
              Gray
            </Tag>
            <Tag endElement={<HiCheck />} size={v}>
              Gray
            </Tag>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
