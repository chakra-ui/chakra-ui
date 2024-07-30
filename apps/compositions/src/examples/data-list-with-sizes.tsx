import { Stack } from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "compositions/ui/data-list"

export const DataListWithSizes = () => {
  return (
    <Stack gap="4">
      <DataListRoot size="sm">
        <DataListItem label="Name" value="John Doe" />
      </DataListRoot>
      <DataListRoot size="md">
        <DataListItem label="Name" value="John Doe" />
      </DataListRoot>
      <DataListRoot size="lg">
        <DataListItem label="Name" value="John Doe" />
      </DataListRoot>
    </Stack>
  )
}
