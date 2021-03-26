import { createContext } from "@chakra-ui/utils"
import { UseDatepickerInputReturn } from "./use-datepicker-input"

interface DatepickerContext
  extends Omit<UseDatepickerInputReturn, "htmlProps"> {}

const [
  DatepickerInputProvider,
  useDatepickerInputContext,
] = createContext<DatepickerContext>({
  name: "DatepickerContext",
  errorMessage:
    "useDatepickerContext: `context` is undefined. Seems you forgot to wrap datepicker's components within <Datepicker />",
})

export { DatepickerInputProvider, useDatepickerInputContext }
