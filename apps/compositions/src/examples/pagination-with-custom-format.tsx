import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const PaginationWithCustomFormat = () => {
  return (
    <Pagination.Root count={50} pageSize={5} defaultPage={1} maxW="240px">
      <ButtonGroup variant="ghost" size="sm" w="full">
        <Pagination.PageText
          flex="1"
          format={({ page, totalPages }) => `Page ${page} de ${totalPages}`}
        />
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
