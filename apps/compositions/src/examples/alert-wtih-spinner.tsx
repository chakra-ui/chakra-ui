import { Spinner } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"

export const AlertWithSpinner = () => {
  return (
    <Alert
      icon={<Spinner size="sm" />}
      maxW="xl"
      borderStartWidth="3px"
      borderStartColor="colorPalette.600"
      title="We are loading something"
    />
  )
}
