import { Switch } from "compositions/ui/switch"
import { HiCheck, HiX } from "react-icons/hi"

export const SwitchWithThumbIcon = () => {
  return (
    <Switch size="lg" thumbIcon={{ on: <HiCheck />, off: <HiX /> }}>
      Switch me
    </Switch>
  )
}
