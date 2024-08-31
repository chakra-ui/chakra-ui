import { EmptyState as ChakraEmptyState, Text, VStack } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface EmptyStateProps extends ChakraEmptyState.RootProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props
    return (
      <ChakraEmptyState.Root ref={ref} {...rest}>
        <ChakraEmptyState.Content>
          {icon && (
            <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>
          )}
          {description ? (
            <VStack textAlign="center">
              <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
              <ChakraEmptyState.Description>
                {description}
              </ChakraEmptyState.Description>
            </VStack>
          ) : (
            <Text fontSize="sm" color="fg.subtle">
              {description}
            </Text>
          )}
          {children}
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    )
  },
)
