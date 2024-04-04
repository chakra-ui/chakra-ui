import { useClipboard } from '@chakra-ui/hooks'
import { Button, ButtonProps } from '@chakra-ui/react'

interface CopyButtonProps extends ButtonProps {
  code: string
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code)

  return (
    <Button
      size='sm'
      position='absolute'
      textTransform='uppercase'
      colorPalette='teal'
      fontSize='xs'
      height='24px'
      top={0}
      zIndex='1'
      right='1.25em'
      {...props}
      onClick={onCopy}
    >
      {hasCopied ? 'Copied!' : 'Copy'}
    </Button>
  )
}

export default CopyButton
