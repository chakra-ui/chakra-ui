import { List } from "@chakra-ui/react"
import { EmptyState } from "compositions/ui/empty-state"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateWithList = () => {
  return (
    <EmptyState
      icon={<HiColorSwatch />}
      title="No results found"
      description="Try adjusting your search"
    >
      <List.Root variant="marker">
        <List.Item>Try removing filters</List.Item>
        <List.Item>Try different keywords</List.Item>
      </List.Root>
    </EmptyState>
  )
}
