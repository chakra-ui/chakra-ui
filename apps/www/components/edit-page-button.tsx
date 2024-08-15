import { HStack, Span } from "@chakra-ui/react"
import Link from "next/link"
import { LiaGithub } from "react-icons/lia"
import { LuArrowUpRight } from "react-icons/lu"

interface Props {
  href: string
}

export const EditPageButton = (props: Props) => {
  const { href } = props
  return (
    <HStack
      asChild
      focusRing="inside"
      focusRingWidth="2px"
      rounded="sm"
      color="fg.muted"
      css={{ "& svg": { fontSize: "lg" } }}
    >
      <Link href={href}>
        <LiaGithub />
        <Span fontSize="0.8em">Edit page on GitHub</Span>
        <LuArrowUpRight />
      </Link>
    </HStack>
  )
}
