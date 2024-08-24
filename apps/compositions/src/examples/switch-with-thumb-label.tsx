import { Switch } from "compositions/ui/switch"
import { HiCheck, HiX } from "react-icons/hi"

export const SwitchWithThumbLabel = () => {
  return (
    <Switch size="lg" thumbLabel={{ on: <HiCheck />, off: <HiX /> }}>
      Switch me
    </Switch>
  )
}
