import { createContext } from "@chakra-ui/react-utils"
import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"
import { UseEditableReturn } from "./use-editable"

export const [EditableStylesProvider, useEditableStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `EditableStylesContext`,
  errorMessage: `useEditableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Editable />" `,
})

export type EditableContext = Omit<UseEditableReturn, "htmlProps">

export const [EditableProvider, useEditableContext] =
  createContext<EditableContext>({
    name: "EditableContext",
    errorMessage:
      "useEditableContext: context is undefined. Seems you forgot to wrap the editable components in `<Editable />`",
  })
