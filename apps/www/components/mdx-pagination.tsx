"use client"

import { Pagination } from "@/components/pagination"
import { useRoute } from "@/lib/use-route"

export function MDXPagination() {
  const route = useRoute()
  return (
    <Pagination
      mt="20"
      gap="8"
      previous={route.getPrevItem()}
      next={route.getNextItem()}
    />
  )
}
