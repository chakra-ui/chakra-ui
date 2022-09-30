# @chakra-ui/pagination

Pagination allows you to divide large amounts of content into smaller chunks
across multiple pages.

## Installation

```sh
yarn add @chakra-ui/pagination

# or

npm i @chakra-ui/pagination
```

## Import component

```jsx
import {
  Pagination,
  PaginationItem,
  PaginationList,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@chakra-ui/react"
```

## Usage

```jsx
<Pagination count={100} pageSize={5}>
  <PaginationList></PaginationList>
</Pagination>
```
