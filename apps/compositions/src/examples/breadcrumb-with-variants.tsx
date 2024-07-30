import { Stack } from "@chakra-ui/react"
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"

export const BreadcrumbWithVariants = () => {
  return (
    <Stack>
      <BreadcrumbRoot variant="plain">
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
        <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <BreadcrumbRoot variant="underline">
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
        <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
    </Stack>
  )
}
