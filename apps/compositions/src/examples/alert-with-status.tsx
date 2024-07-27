import { Stack } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"

export const AlertWithStatus = () => {
  return (
    <Stack gap="2" width="full">
      <Alert
        status="error"
        title="There was an error processing your request"
      />
      <Alert
        status="info"
        title="Chakra is going live on August 30th. Get ready!"
      />
      <Alert
        status="warning"
        title="Seems your account is about expire, upgrade now"
      />
      <Alert status="success" title="Data uploaded to the server. Fire on!" />
    </Stack>
  )
}
