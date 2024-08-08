import { For, HStack, Stack } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"

export const PaginationWithSizes = () => {
  return (
    <Stack gap="8">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <PaginationRoot
            key={size}
            count={10}
            pageSize={2}
            defaultPage={1}
            size={size}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        )}
      </For>
    </Stack>
  )
}
