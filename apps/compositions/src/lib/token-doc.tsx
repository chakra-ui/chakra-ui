import { Box, type BoxProps } from "@chakra-ui/react"

interface TokenDocProps extends BoxProps {
  action?: React.ReactNode
}

export const TokenDoc = (props: TokenDocProps) => {
  const { title, children, action, ...rest } = props
  return (
    <Box bg="bg" rounded="lg" borderWidth="0.5px" {...rest}>
      <Box p="6" pb="0">
        {title && (
          <Box fontWeight="medium" fontSize="sm" as="h2">
            {title}
          </Box>
        )}
        {action}
      </Box>
      <Box p="6">{children}</Box>
    </Box>
  )
}
