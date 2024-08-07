import { For, HStack, Stack } from "@chakra-ui/react"
import { Tag } from "compositions/ui/tag"
import { HiCheck } from "react-icons/hi"

export const TagWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["subtle", "solid", "surface", "raised"]}>
        {(v) => (
          <HStack>
            <Tag variant={v}>Gray</Tag>
            <Tag variant={v} closable>
              Gray
            </Tag>
            <Tag endElement={<HiCheck />} variant={v}>
              Gray
            </Tag>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
