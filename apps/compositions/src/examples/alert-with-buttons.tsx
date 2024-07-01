import { Box, Group } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"
import { Button } from "compositions/ui/button"

export const AlertWithButtons = () => {
  return (
    <Alert status="info" title="This is the alert title" flex="1">
      <Box>This is the alert description</Box>
      <Group mt="2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Secondary
        </Button>
      </Group>
    </Alert>
  )
}
