import { StoryFn } from "@storybook/react"
import * as React from "react"
import {
  Editable,
  Heading,
  chakra,
  useEditable,
  useEditableControls,
} from "../src"

export default {
  title: "Forms / Editable",
  decorators: [
    (Story: StoryFn) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        <Story />
      </chakra.div>
    ),
  ],
}

const Actions = () => {
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

export const UseEditableHook = () => {
  const state = useEditable({
    placeholder: "Title...",
    submitOnBlur: true,
    onCancel: () => console.log("cancel"),
    onSubmit: () => console.log("submit"),
  })

  return (
    <>
      <input
        style={{ width: "auto", background: "transparent" }}
        {...state.getInputProps()}
      />
      <span
        style={{ opacity: state.isValueEmpty ? 0.7 : 1 }}
        {...state.getPreviewProps()}
      />
      {!state.isEditing && <button onClick={state.onEdit}>Edit</button>}
      {state.isEditing && (
        <>
          <button {...state.getSubmitButtonProps()}>Save</button>
          <button {...state.getCancelButtonProps({ style: { padding: 10 } })}>
            Cancel
          </button>
        </>
      )}
    </>
  )
}

export const Basic = () => (
  <Editable.Root
    textAlign="center"
    defaultValue="Rasengan ⚡️"
    fontSize="2xl"
    onSubmit={() => console.log("onSubmit", Math.random())}
    isPreviewFocusable
  >
    <Editable.Preview />
    <Editable.Input />
  </Editable.Root>
)

export const CodeSandboxDemo = () => {
  return (
    <chakra.div py="4" display="flex" alignItems="center">
      <chakra.p fontWeight="medium">My Sandboxes</chakra.p>
      <chakra.span mx="3">/</chakra.span>
      <Editable.Root defaultValue="chakra-ui-demo">
        <Editable.Input _focus={{ boxShadow: "none" }} />
        <Editable.Preview />
      </Editable.Root>
    </chakra.div>
  )
}

export const WithTextarea = () => {
  return (
    <Editable.Root
      defaultValue="Hello!!"
      fontSize="xl"
      textAlign="center"
      isPreviewFocusable={false}
      submitOnBlur={false}
      onChange={console.log}
    >
      <Editable.Preview />
      <Editable.Textarea />
      <Actions />
    </Editable.Root>
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
      <Editable.Root
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
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
    </>
  )
}

export const Disabled = () => (
  <Editable.Root isDisabled defaultValue="Rasengan ⚡️" fontSize="xl">
    <Editable.Preview />
    <Editable.Input />
    <Actions />
  </Editable.Root>
)

export const FinalFocusRef = () => {
  const finalFocusRef = React.useRef(null)

  return (
    <>
      <input ref={finalFocusRef} />
      <Editable.Root
        finalFocusRef={finalFocusRef}
        defaultValue="Final fantasy"
        fontSize="xl"
      >
        <Editable.Preview />
        <Editable.Input />
        <Actions />
      </Editable.Root>
    </>
  )
}
