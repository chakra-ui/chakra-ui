import { Box, BoxProps } from "@chakra-ui/react"

export function Blob(props: BoxProps) {
  return (
    <Box
      width="1000px"
      height="800px"
      pos="absolute"
      opacity="0.05"
      pointerEvents="none"
      flexShrink={0}
      bgImage="radial-gradient(#5EEAD4 0%, rgba(94, 234, 212, 0) 60%)"
      hideBelow="md"
      zIndex="0"
      {...props}
    />
  )
}
