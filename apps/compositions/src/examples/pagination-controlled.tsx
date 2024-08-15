"use client"

import { HStack } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"
import { useState } from "react"

export const PaginationControlled = () => {
  const [page, setPage] = useState(1)

  return (
    <PaginationRoot
      count={20}
      pageSize={2}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  )
}
