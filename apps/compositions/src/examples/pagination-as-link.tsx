"use client"

import { HStack } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "compositions/ui/pagination"

export const PaginationAsLink = () => {
  return (
    <PaginationRoot
      count={20}
      pageSize={2}
      defaultPage={1}
      getHref={(page) => `?page=${page}`}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  )
}
