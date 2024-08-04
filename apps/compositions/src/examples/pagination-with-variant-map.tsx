import { HStack } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"

export const PaginationWithVariantMap = () => {
  return (
    <PaginationRoot
      count={10}
      pageSize={2}
      defaultPage={1}
      variantMap={{ default: "outline", ellipsis: "outline", current: "solid" }}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  )
}
