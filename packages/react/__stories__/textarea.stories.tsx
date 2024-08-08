import { TextareaBasic } from "compositions/examples/textarea-basic"
import { TextareaSizeTable } from "compositions/examples/textarea-size-table"
import { TextareaVariantTable } from "compositions/examples/textarea-variant-table"
import { TextareaWithAutoresize } from "compositions/examples/textarea-with-autoresize"
import { TextareaWithErrorText } from "compositions/examples/textarea-with-error-text"
import { TextareaWithField } from "compositions/examples/textarea-with-field"
import { TextareaWithForm } from "compositions/examples/textarea-with-form"
import { TextareaWithHelperText } from "compositions/examples/textarea-with-helper-text"
import { TextareaWithResize } from "compositions/examples/textarea-with-resize"
import { Box } from "../src"

export default {
  title: "Components / Textarea",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Basic = () => {
  return <TextareaBasic />
}

export const WithAutoresize = () => {
  return <TextareaWithAutoresize />
}

export const WithErrorText = () => {
  return <TextareaWithErrorText />
}

export const WithField = () => {
  return <TextareaWithField />
}

export const WithHelperText = () => {
  return <TextareaWithHelperText />
}

export const WithResize = () => {
  return <TextareaWithResize />
}

export const Variants = () => {
  return <TextareaVariantTable />
}

export const Sizes = () => {
  return <TextareaSizeTable />
}

export const WithForm = () => {
  return <TextareaWithForm />
}
