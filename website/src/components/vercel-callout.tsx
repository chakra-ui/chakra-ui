import { Box } from '@chakra-ui/react'
import { t } from 'utils/i18n'

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
    {t('component.vercel-callout.deployed-by')}{' '}
    <span role='img' aria-label='Vercel logo'>
      ▲
    </span>{' '}
    Vercel
  </Box>
)
