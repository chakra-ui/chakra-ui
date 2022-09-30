import * as pagination from "@zag-js/pagination"
import { useMachine, normalizeProps } from "@zag-js/react"
import { useId, useMemo } from "react"
import { UsePaginationProps } from "./pagination-types"

export function usePagination(props: UsePaginationProps) {
  const {
    page,
    defaultPage = 1,
    count,
    siblingCount = 1,
    pageSize,
    defaultPageSize = 10,
    onChange,
  } = props
  const context = useMemo(
    () => ({
      page: page ?? defaultPage,
      pageSize: pageSize ?? defaultPageSize,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize],
  )

  const [state, send] = useMachine(
    pagination.machine({
      id: useId(),
      siblingCount,
      count,
      onChange,
    }),
    {
      context,
    },
  )
  const api = pagination.connect(state, send, normalizeProps)

  return api
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
