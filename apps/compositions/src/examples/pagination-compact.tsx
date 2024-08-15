import { HStack } from "@chakra-ui/react"
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"

export const PaginationCompact = () => {
  return (
    <PaginationRoot count={20} pageSize={2} defaultPage={1}>
      <HStack gap="4">
        <PaginationPrevTrigger />
        <PaginationPageText />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  )
}
