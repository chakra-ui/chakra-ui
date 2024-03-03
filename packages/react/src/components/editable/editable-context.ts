import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UseEditableReturn } from "./use-editable"

export const [EditableStylesProvider, useEditableStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `EditableStylesContext`,
  errorMessage: `useEditableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Editable />" `,
})

export interface EditableContext extends UseEditableReturn {}

export const [EditableProvider, useEditableContext] =
  createContext<EditableContext>({
    name: "EditableContext",
    errorMessage:
      "useEditableContext: context is undefined. Seems you forgot to wrap the editable components in `<Editable />`",
  })
