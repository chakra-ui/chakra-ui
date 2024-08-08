import { AvatarBasic } from "compositions/examples/avatar-basic"
import { AvatarSizeTable } from "compositions/examples/avatar-size-table"
import { AvatarVariantTable } from "compositions/examples/avatar-variant-table"
import { AvatarWithBadge } from "compositions/examples/avatar-with-badge"
import { AvatarWithFallback } from "compositions/examples/avatar-with-fallback"
import { AvatarWithGroup } from "compositions/examples/avatar-with-group"
import { Box } from "../src"

export default {
  title: "Components / Avatar",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <AvatarBasic />
}

export const Fallback = () => {
  return <AvatarWithFallback />
}

export const WithBadge = () => {
  return <AvatarWithBadge />
}

export const Variants = () => {
  return <AvatarVariantTable />
}

export const Sizes = () => {
  return <AvatarSizeTable />
}

export const Grouped = () => {
  return <AvatarWithGroup />
}
