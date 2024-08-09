import { Box } from "../src"

export default {
  title: "Components / Breadcrumb",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { BreadcrumbBasic as Basic } from "compositions/examples/breadcrumb-basic"
export { BreadcrumbWithEllipsis as WithEllipsis } from "compositions/examples/breadcrumb-with-ellipsis"
export { BreadcrumbWithIcon as WithIcon } from "compositions/examples/breadcrumb-with-icon"
export { BreadcrumbWithMenu as WithMenu } from "compositions/examples/breadcrumb-with-menu"
export { BreadcrumbWithSeparator as WithSeparator } from "compositions/examples/breadcrumb-with-separator"
export { BreadcrumbVariantTable as Variants } from "compositions/examples/breadcrumb-variant-table"
export { BreadcrumbSizeTable as Sizes } from "compositions/examples/breadcrumb-size-table"
