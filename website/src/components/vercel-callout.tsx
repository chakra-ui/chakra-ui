import { Box } from '@chakra-ui/react'

export const VercelCallout = () => (
  <Box
    mt='6'
    fontSize='sm'
    fontWeight='semibold'
    display='inline-block'
    bg='black'
    color='white'
    px='4'
    py='2'
    rounded='lg'
  >
    Deployed by{' '}
    <span role='img' aria-label='Vercel logo'>
      ▲
    </span>{' '}
    Vercel
  </Box>
)
