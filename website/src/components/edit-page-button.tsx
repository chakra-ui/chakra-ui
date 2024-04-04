import { Icon, Link, Stack } from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'

const EditPageLink = ({ href }: { href?: string }) => {
  return (
    <Link href={href} external>
      <Stack
        fontSize='sm'
        textAlign='right'
        display='inline-flex'
        direction='row'
        gap={1}
        align='center'
        opacity={0.7}
      >
        <Icon as={MdEdit} mr='1' />
        <span>Edit this page on GitHub</span>
      </Stack>
    </Link>
  )
}

export default EditPageLink
