import { Group } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"
import { Button } from "compositions/ui/button"

export const AlertWithButtons = () => {
  return (
    <Alert status="error" title="This is the alert title" flex="1">
      This is the alert description
      <Group mt="2">
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
      </Group>
    </Alert>
  )
}
