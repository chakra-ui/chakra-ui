import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Wrap,
  usePaginationContext,
} from "../src"

export default {
  title: "Components / Pagination",
  decorators: [
    (Story: React.ElementType) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

function EllipsisItem(props: Pagination.EllipsisProps) {
  return (
    <Pagination.Ellipsis index={props.index} asChild>
      <Button variant="plain" size="sm">
        &#8230;
      </Button>
    </Pagination.Ellipsis>
  )
}

function PageItem(props: Pagination.ItemProps) {
  const { page } = usePaginationContext()
  const current = page === props.value
  return (
    <Pagination.Item {...props} asChild>
      <Button variant={current ? "solid" : "outline"} size="sm">
        {props.value}
      </Button>
    </Pagination.Item>
  )
}

const PaginationItems = () => {
  return (
    <Pagination.Context>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === "ellipsis" ? (
            <EllipsisItem key={index} index={index} />
          ) : (
            <PageItem {...page} />
          )
        })
      }
    </Pagination.Context>
  )
}

export const Basic = () => (
  <Pagination.Root count={100} pageSize={10}>
    <Wrap>
      <Pagination.PrevTrigger>
        <IconButton variant="outline" size="sm">
          <HiChevronLeft />
        </IconButton>
      </Pagination.PrevTrigger>

      <PaginationItems />

      <Pagination.NextTrigger asChild>
        <IconButton variant="outline" size="sm">
          <HiChevronRight />
        </IconButton>
      </Pagination.NextTrigger>
    </Wrap>
  </Pagination.Root>
)
