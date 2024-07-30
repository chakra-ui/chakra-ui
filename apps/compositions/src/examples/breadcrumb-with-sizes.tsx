import { Stack } from "@chakra-ui/react"
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"

export const BreadcrumbWithSizes = () => {
  return (
    <Stack>
      <BreadcrumbRoot size="sm">
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
        <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <BreadcrumbRoot size="md">
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
        <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <BreadcrumbRoot size="lg">
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
        <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
    </Stack>
  )
}
