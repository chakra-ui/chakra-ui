import { HStack } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"

export const PaginationWithVariants = () => {
  return (
    <PaginationRoot count={20} pageSize={2} defaultPage={1} variant="solid">
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  )
}
