import { For, HStack, Stack, Tag } from "@chakra-ui/react"
import { HiCheck } from "react-icons/hi"

export const TagWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["subtle", "solid", "outline", "surface"]}>
        {(variant) => (
          <HStack key={variant}>
            <Tag.Root variant={variant}>
              <Tag.Label>Gray</Tag.Label>
            </Tag.Root>
            <Tag.Root variant={variant}>
              <Tag.Label>Gray</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger />
              </Tag.EndElement>
            </Tag.Root>
            <Tag.Root variant={variant}>
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
