import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

export const PaginationCompact = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup gap="4" size="sm" variant="ghost">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.PageText />
        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
