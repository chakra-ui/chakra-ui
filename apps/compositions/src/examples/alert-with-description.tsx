import { Alert } from "compositions/ui/alert"

export const AlertWithDescription = () => {
  return (
    <Alert status="error" title="Invalid Fields">
      Your form has some errors. Please fix them and try again.
    </Alert>
  )
}
