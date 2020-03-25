import { chakra, PropsOf } from "@chakra-ui/system"

export type HeadingProps = PropsOf<typeof Heading>
export const Heading = chakra("h2", { themeKey: "Heading" })
