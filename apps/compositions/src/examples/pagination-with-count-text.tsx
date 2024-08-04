import { HStack } from "@chakra-ui/react"
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"

export const PaginationWithCountText = () => {
  return (
    <PaginationRoot count={50} pageSize={5} defaultPage={1} maxW="240px">
      <HStack gap="4">
        <PaginationPageText format="long" flex="1" />
        <PaginationPrevTrigger />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  )
}
