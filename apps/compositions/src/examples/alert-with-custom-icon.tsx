import { Alert } from "compositions/ui/alert"
import { LuAlarmPlus } from "react-icons/lu"

export const AlertWithCustomIcon = () => {
  return (
    <Alert
      icon={<LuAlarmPlus />}
      status="warning"
      title="Submitting this form will delete your account"
    />
  )
}
