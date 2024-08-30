import { Stack } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"

export const AlertWithVariants = () => {
  return (
    <Stack gap="3">
      <Alert
        status="success"
        variant="subtle"
        title="Data uploaded to the server. Fire on!"
      />

      <Alert
        status="success"
        variant="solid"
        title="Data uploaded to the server. Fire on!"
      />

      <Alert
        status="success"
        variant="surface"
        title="Data uploaded to the server. Fire on!"
      />
    </Stack>
  )
}
