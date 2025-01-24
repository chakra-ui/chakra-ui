import { Alert } from "@chakra-ui/react"
import { LuAlarmClockPlus } from "react-icons/lu"

export const AlertWithCustomIcon = () => {
  return (
    <Alert.Root status="warning">
      <Alert.Indicator>
        <LuAlarmClockPlus />
      </Alert.Indicator>
      <Alert.Title>Submitting this form will delete your account</Alert.Title>
    </Alert.Root>
  )
}
