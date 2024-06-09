import { HiPlus, HiTemplate } from "react-icons/hi"
import { Box, Button, EmptyState, Text, VStack } from "../src"

export default {
  title: "Components / Empty State",
  decorators: [
    (Story: any) => (
      <Box mx="auto" padding="10">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiTemplate />
        </EmptyState.Indicator>

        <VStack textAlign="center">
          <Text fontWeight="medium">No template found</Text>
          <Text fontSize="sm" color="fg.muted">
            Try creating a new template with the button below
          </Text>
        </VStack>

        <Button variant="outline">
          <HiPlus /> Create Template
        </Button>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
