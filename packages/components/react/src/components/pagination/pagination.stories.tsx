import { Button } from "@chakra-ui/button"
import VisuallyHidden from "@chakra-ui/visually-hidden"
import { Meta } from "@storybook/react"
import { Pagination } from "./pagination"
import { PaginationEllipsis } from "./pagination-ellipsis"
import { PaginationItem } from "./pagination-item"
import { PaginationList } from "./pagination-list"
import { PaginationNextItem } from "./pagination-next-item"
import { PaginationPrevItem } from "./pagination-prev-item"

export default {
  title: "Pagination",
} as Meta

export const Basic = () => (
  <Pagination count={100}>
    {({ pages }) => (
      <PaginationList>
        <PaginationPrevItem>
          <Button variant="outline">
            Previous <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationPrevItem>

        {pages.map((page, index) =>
          page.type === "page" ? (
            <PaginationItem key={index} value={page.value}>
              <Button variant="ghost">{page.value}</Button>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index} index={index}>
              &#8230;
            </PaginationEllipsis>
          ),
        )}

        <PaginationNextItem>
          <Button variant="outline">
            Next <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationNextItem>
      </PaginationList>
    )}
  </Pagination>
)
