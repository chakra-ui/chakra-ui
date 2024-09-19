"use client"

import { Pagination } from "@/components/pagination"
import { useRoute } from "@/lib/use-route"

export function MDXPagination() {
  const route = useRoute()
  return (
    <Pagination previous={route.getPrevItem()} next={route.getNextItem()} />
  )
}
