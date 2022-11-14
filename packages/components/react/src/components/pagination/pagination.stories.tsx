import { Button, ButtonGroup } from "@chakra-ui/button"
import { Center } from "@chakra-ui/layout"
import VisuallyHidden from "@chakra-ui/visually-hidden"
import { Meta } from "@storybook/react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
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
  <Pagination count={100} page={2}>
    {({ pages }) => (
      <PaginationList gap="1">
        <PaginationPrevItem>
          <Button variant="ghost" leftIcon={<FiArrowLeft fontSize="1.25rem" />}>
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
              <Button variant="ghost">&#8230;</Button>
            </PaginationEllipsis>
          ),
        )}

        <PaginationNextItem>
          <Button
            variant="ghost"
            rightIcon={<FiArrowRight fontSize="1.25rem" />}
          >
            Next <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationNextItem>
      </PaginationList>
    )}
  </Pagination>
)

export const withSpaceBetween = () => (
  <Pagination count={100} page={2}>
    {({ pages }) => (
      <PaginationList justifyContent="space-between">
        <PaginationPrevItem>
          <Button
            variant="outline"
            leftIcon={<FiArrowLeft fontSize="1.25rem" />}
          >
            Previous <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationPrevItem>

        <PaginationList gap="1">
          {pages.map((page, index) =>
            page.type === "page" ? (
              <PaginationItem key={index} value={page.value}>
                <Button variant="ghost">{page.value}</Button>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index}>
                <Button variant="ghost">&#8230;</Button>
              </PaginationEllipsis>
            ),
          )}
        </PaginationList>
        <PaginationNextItem>
          <Button
            variant="outline"
            rightIcon={<FiArrowRight fontSize="1.25rem" />}
          >
            Next <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationNextItem>
      </PaginationList>
    )}
  </Pagination>
)

export const withButtonGroup = () => (
  <Pagination count={100} page={2}>
    {({ pages }) => (
      <ButtonGroup as={PaginationList} isAttached gap={0}>
        <PaginationPrevItem>
          <Button
            variant="outline"
            borderEndRadius="inherit"
            marginInlineEnd="-1px"
            leftIcon={<FiArrowLeft fontSize="1.25rem" />}
          >
            Previous <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationPrevItem>

        {pages.map((page, index) =>
          page.type === "page" ? (
            <PaginationItem key={index} value={page.value}>
              <Button
                variant="outline"
                borderRadius="inherit"
                marginInlineEnd="-1px"
              >
                {page.value}
              </Button>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index} index={index}>
              <Button
                variant="outline"
                borderRadius="inherit"
                marginInlineEnd="-1px"
              >
                &#8230;
              </Button>
            </PaginationEllipsis>
          ),
        )}

        <PaginationNextItem>
          <Button
            variant="outline"
            borderStartRadius="inherit"
            rightIcon={<FiArrowRight fontSize="1.25rem" />}
          >
            Next <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationNextItem>
      </ButtonGroup>
    )}
  </Pagination>
)

export const withShort = () => (
  <Pagination count={100} page={2}>
    {({ pages, page }) => (
      <PaginationList gap="1">
        <PaginationPrevItem>
          <Button
            variant="outline"
            leftIcon={<FiArrowLeft fontSize="1.25rem" />}
          >
            Previous <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationPrevItem>

        <Center as="span" flex="1" fontWeight="medium">
          Page {page} of {pages.length}
        </Center>

        <PaginationNextItem>
          <Button
            variant="outline"
            rightIcon={<FiArrowRight fontSize="1.25rem" />}
          >
            Next <VisuallyHidden>Page</VisuallyHidden>
          </Button>
        </PaginationNextItem>
      </PaginationList>
    )}
  </Pagination>
)
