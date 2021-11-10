# @chakra-ui/breadcrumb

Breadcrumbs help users visualize their current location in relation to the rest
of the website or application by showing the hierarchy of pages.

## Installation

```sh
yarn add @chakra-ui/breadcrumb

# or

npm i @chakra-ui/breadcrumb
```

## Import components

Chakra UI exports 3 breadcrumb related components:

- `Breadcrumb`: The parent container for breadcrumbs.
- `BreadcrumbItem`: Individual breadcrumb element containing a link and a
  divider.
- `BreadcrumbLink`: The breadcrumb link.

```js
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
```

## Usage

Add `isCurrentPage` prop to the `BreadcrumbItem` that matches the current path.
When this prop is present, the `BreadcrumbItem` doesn't have a separator, and
the `BreadcrumbLink` has `aria-current` set to `page`.

```jsx
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href="#">Docs</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Help</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Separators

Change the separator used in the breadcrumb by passing a string, like `-` or any
react element (e.g. an icon)

```jsx
<Breadcrumb separator="-">
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href="/about">About</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Using an icon as the separator

```jsx
<Breadcrumb
  spacing="8px"
  separator={<Icon color="gray.300" name="chevron-right" />}
>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href="/about">About</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```
