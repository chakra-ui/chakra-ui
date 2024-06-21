"use client"

import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useBreadcrumbStyles,
} = createStyleContext("breadcrumb")

export { useBreadcrumbStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbRootProps
  extends HTMLChakraProps<"nav">,
    SlotRecipeProps<"breadcrumb">,
    UnstyledProp {}

export const BreadcrumbRoot = withProvider<HTMLElement, BreadcrumbRootProps>(
  "nav",
  "root",
  {
    defaultProps: {
      "aria-label": "breadcrumb",
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbListProps extends HTMLChakraProps<"ol"> {}

export const BreadcrumbList = withContext<HTMLElement, BreadcrumbListProps>(
  "ol",
  "list",
)

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbItemProps extends HTMLChakraProps<"li"> {}

export const BreadcrumbItem = withContext<HTMLElement, BreadcrumbItemProps>(
  "li",
  "item",
)

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbLinkProps extends HTMLChakraProps<"a"> {}

export const BreadcrumbLink = withContext<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>("a", "link")

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbCurrentLinkProps extends HTMLChakraProps<"span"> {}

export const BreadcrumbCurrentLink = withContext<
  HTMLElement,
  BreadcrumbCurrentLinkProps
>("span", "currentLink", {
  defaultProps: {
    role: "link",
    "aria-current": "page",
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"li"> {}

const RightIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </chakra.svg>
)

export const BreadcrumbSeparator = withContext<
  HTMLElement,
  BreadcrumbSeparatorProps
>("li", "separator", {
  defaultProps: {
    children: <RightIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface BreadcrumbEllipsisProps extends HTMLChakraProps<"span"> {}

const EllpsisIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </chakra.svg>
)

export const BreadcrumbEllipsis = withContext<
  HTMLElement,
  BreadcrumbEllipsisProps
>("span", "ellipsis", {
  defaultProps: {
    role: "presentation",
    "aria-hidden": true,
    children: <EllpsisIcon />,
  },
})
