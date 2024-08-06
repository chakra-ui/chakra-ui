import { HStack } from "@chakra-ui/react"
import { SegmentedControl } from "compositions/ui/segmented-control"
import { LuGrid, LuList, LuTable } from "react-icons/lu"

export const SegmentedControlWithIcon = () => {
  return (
    <SegmentedControl
      defaultValue="table"
      items={[
        {
          value: "table",
          label: (
            <HStack>
              <LuTable />
              Table
            </HStack>
          ),
        },
        {
          value: "board",
          label: (
            <HStack>
              <LuGrid />
              Board
            </HStack>
          ),
        },
        {
          value: "list",
          label: (
            <HStack>
              <LuList />
              List
            </HStack>
          ),
        },
      ]}
    />
  )
}
