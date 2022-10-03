import { testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationList,
  PaginationNextItem,
  PaginationPrevItem,
} from "../src"

it("passes a11y test", async () => {
  await testA11y(
    <Pagination count={100} className="pag">
      {({ pages }) => (
        <div>
          <PaginationList>
            <PaginationPrevItem href="javascript:void(0)">
              &lt;
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
              else return <PaginationEllipsis index={i} key={`ellipsis-${i}`} />
            })}
            <PaginationNextItem href="javascript:void(0)">
              &gt;
            </PaginationNextItem>
          </PaginationList>
        </div>
      )}
    </Pagination>,
  )
})
