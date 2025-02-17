import { For, RatingGroup, Stack } from "@chakra-ui/react"

export const RatingWithSizes = () => {
  return (
    <Stack>
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <RatingGroup.Root key={size} count={5} defaultValue={3} size={size}>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingGroup.Item key={index} index={index + 1}>
                  <RatingGroup.ItemIndicator />
                </RatingGroup.Item>
              ))}
            </RatingGroup.Control>
          </RatingGroup.Root>
        )}
      </For>
    </Stack>
  )
}
