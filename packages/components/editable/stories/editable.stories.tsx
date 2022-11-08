import { Heading } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  useEditable,
  useEditableControls,
} from "../src"

export default {
  title: "Components / Forms / Editable",
  decorators: [
    (Story: Function) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        <Story />
      </chakra.div>
    ),
  ],
}

export const UseEditableHook = () => {
  const {
    getInputProps,
    getPreviewProps,
    getCancelButtonProps,
    getSubmitButtonProps,
    isValueEmpty,
    isEditing,
    onEdit,
  } = useEditable({
    placeholder: "Title...",
    submitOnBlur: true,
    onCancel: () => console.log("cancel"),
    onSubmit: () => console.log("submit"),
  })

  return (
    <>
      <input
        style={{ width: "auto", background: "transparent" }}
        {...getInputProps()}
      />
      <span
        style={{ opacity: isValueEmpty ? 0.7 : 1 }}
        {...getPreviewProps()}
      />
      {!isEditing && <button onClick={onEdit}>Edit</button>}
      {isEditing && (
        <>
          <button {...getSubmitButtonProps()}>Save</button>
          <button {...getCancelButtonProps({ style: { padding: 10 } })}>
            Cancel
          </button>
        </>
      )}
    </>
  )
}

const EditableControls = () => {
  const {
    isEditing,
    getEditButtonProps,
    getSubmitButtonProps,
    getCancelButtonProps,
  } = useEditableControls()

  return (
    <div>
      {!isEditing ? (
        <button {...getEditButtonProps()}>Edit</button>
      ) : (
        <>
          <button {...getSubmitButtonProps()}>Save</button>
          <button {...getCancelButtonProps()}>Cancel</button>
        </>
      )}
    </div>
  )
}

export const Basic = () => (
  <Editable
    textAlign="center"
    value="Rasengan ⚡️"
    fontSize="2xl"
    onSubmit={() => console.log("onSubmit", Math.random())}
    isPreviewFocusable
  >
    <EditablePreview />
    <EditableInput />
    {/* <EditableControls /> */}
  </Editable>
)

export const CodeSandboxTopbar = () => {
  return (
    <chakra.div py="4" display="flex" alignItems="center">
      <chakra.p fontWeight="medium">My Sandboxes</chakra.p>
      <chakra.span mx="3">/</chakra.span>
      <Editable defaultValue="chakra-ui-demo">
        <EditableInput _focus={{ boxShadow: "none" }} />
        <EditablePreview />
      </Editable>
    </chakra.div>
  )
}

export const TextareaAsInput = () => {
  return (
    <Editable
      defaultValue="Hello!!"
      fontSize="xl"
      textAlign="center"
      isPreviewFocusable={false}
      submitOnBlur={false}
      onChange={console.log}
    >
      <EditablePreview />
      <EditableTextarea />
      <EditableControls />
    </Editable>
  )
}

export const EditableEventHandler = () => {
  const [name, setName] = React.useState("")
  console.log("State 'name' is ", name)

  React.useEffect(() => {
    setName("John")
  }, [])

  return (
    <>
      <Heading>Name State=[{name}]</Heading>
      <Editable
        value={name}
        onChange={(value) => {
          console.log("onChange called with ", value)
          setName(value)
        }}
        onSubmit={(value) => {
          console.log("onSubmit called with ", value)
          setName(value)
        }}
        onCancel={(value) => {
          console.log("onCancel called with ", value)
          setName(value)
        }}
        placeholder="Enter your name"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </>
  )
}

export const Disabled = () => (
  <Editable isDisabled defaultValue="Rasengan ⚡️" fontSize="xl">
    <EditablePreview />
    <EditableInput />
    <EditableControls />
  </Editable>
)
