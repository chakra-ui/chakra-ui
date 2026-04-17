import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationWithCountText = () => {
  return (
    <Pagination.Root count={50} pageSize={5} defaultPage={1} maxW="240px">
      <ButtonGroup variant="ghost" size="sm" w="full">
        <Pagination.PageText format="long" flex="1" />
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Next page">
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
