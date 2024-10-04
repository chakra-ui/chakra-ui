import { Alert } from "compositions/ui/alert"

export const AlertWithCloseButton = () => {
  return (
    <Alert title="Success!" closable>
      Your application has been received. We will review your application and
      respond within the next 48 hours.
    </Alert>
  )
}
