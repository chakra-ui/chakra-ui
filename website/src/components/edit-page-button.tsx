import * as React from "react"
import { chakra, Icon, Stack, Link } from "@chakra-ui/react"
import { MdEdit } from "react-icons/md"

const EditPageLink: React.FC<{ href?: string }> = ({ href }) => {
  return (
    <Link href={href} isExternal>
      <Stack
        display="inline-flex"
        direction="row"
        spacing={1}
        align="center"
        opacity={0.7}
      >
        <Icon as={MdEdit} mr="1" />
        <chakra.span>Edit this page</chakra.span>
      </Stack>
    </Link>
  )
}

export default EditPageLink
