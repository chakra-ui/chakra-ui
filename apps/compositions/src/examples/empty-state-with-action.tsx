import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateWithAction = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Start adding tokens</EmptyState.Title>
          <EmptyState.Description>
            Add a new design token to get started
          </EmptyState.Description>
        </VStack>
        <ButtonGroup>
          <Button>Create token</Button>
          <Button variant="outline">Import</Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
