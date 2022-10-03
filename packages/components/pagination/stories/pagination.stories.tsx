import { Container } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationList,
  PaginationNextItem,
  PaginationPrevItem,
  usePagination,
} from "../src"

export default {
  title: "Components / Pagination",
  decorators: [(story: Function) => <Container mt="40px">{story()}</Container>],
}

export const Basic = () => {
  return (
    <Pagination count={100} className="pag">
      {({ page: currentPage, totalPages, pages }) => (
        <div>
          <PaginationList>
            <PaginationPrevItem href="javascript:void(0)">
              <chakra.svg viewBox="0 0 24 24" boxSize="1.4em">
                <path
                  fill="currentColor"
                  d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                ></path>
              </chakra.svg>
            </PaginationPrevItem>
            {pages.map((page, i) => {
              if (page.type === "page")
                return (
                  <PaginationItem
                    page={page}
                    key={page.value}
                    href="javascript:void(0)"
                  >
                    {page.value}
                  </PaginationItem>
                )
              else
                return (
                  <PaginationEllipsis index={i} key={`ellipsis-${i}`}>
                    <chakra.svg
                      fill="none"
                      shapeRendering="geometricPrecision"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      boxSize="8"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        fill="currentColor"
                        r="1"
                      ></circle>
                      <circle
                        cx="19"
                        cy="12"
                        fill="currentColor"
                        r="1"
                      ></circle>
                      <circle cx="5" cy="12" fill="currentColor" r="1"></circle>
                    </chakra.svg>
                  </PaginationEllipsis>
                )
            })}
            <PaginationNextItem href="javascript:void(0)">
              <chakra.svg viewBox="0 0 24 24" boxSize="1.4em">
                <path
                  fill="currentColor"
                  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                ></path>
              </chakra.svg>
            </PaginationNextItem>
          </PaginationList>
          <chakra.div mt="4">
            <span>
              {currentPage} of {totalPages} pages
            </span>
          </chakra.div>
        </div>
      )}
    </Pagination>
  )
}

export const WithHook = () => {
  const api = usePagination({ count: 100 })
  return (
    <>
      {api.totalPages > 1 && (
        <nav {...api.rootProps}>
          <chakra.ul listStyleType="none" display="flex" gap="2">
            <li>
              <a href="javascript:void(0)" {...api.prevItemProps}>
                Previous <chakra.span srOnly>Page</chakra.span>
              </a>
            </li>
            {api.pages.map((page, i) => {
              if (page.type === "page")
                return (
                  <li key={page.value}>
                    <a href="javascript:void(0)" {...api.getItemProps(page)}>
                      {page.value}
                    </a>
                  </li>
                )
              else
                return (
                  <li key={`ellipsis-${i}`}>
                    <span {...api.getEllipsisProps({ index: i })}>&#8230;</span>
                  </li>
                )
            })}
            <li>
              <a href="javascript:void(0)" {...api.nextItemProps}>
                Next <chakra.span srOnly>Page</chakra.span>
              </a>
            </li>
          </chakra.ul>
          <div>
            <span>
              {api.page} of {api.totalPages} pages
            </span>
          </div>
        </nav>
      )}
    </>
  )
}
