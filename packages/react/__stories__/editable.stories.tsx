import type { StoryFn } from "@storybook/react"
import * as React from "react"
import { Editable, Heading, chakra } from "../src"

export default {
  title: "Components / Editable",
  decorators: [
    (Story: StoryFn) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        <Story />
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <Editable.Root
    textAlign="center"
    defaultValue="Rasengan ⚡️"
    fontSize="2xl"
    onSubmit={() => console.log("onSubmit", Math.random())}
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
      submitMode="enter"
      onValueChange={console.log}
    >
      <Editable.Preview />
      <Editable.Textarea />

      <Editable.Control>
        <Editable.EditTrigger>Edit</Editable.EditTrigger>
        <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
        <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
  )
}

export const Controlled = () => {
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    setName("John")
  }, [])

  return (
    <>
      <Heading>Name State=[{name}]</Heading>
      <Editable.Root
        value={name}
        onValueChange={(changes) => {
          console.log("onChange called with ", changes.value)
          setName(changes.value)
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
  <Editable.Root disabled defaultValue="Rasengan ⚡️" fontSize="xl">
    <Editable.Preview />
    <Editable.Input />
    <Editable.Control>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
    </Editable.Control>
  </Editable.Root>
)

export const FinalFocusRef = () => {
  const finalFocusRef = React.useRef(null)

  return (
    <>
      <input ref={finalFocusRef} />
      <Editable.Root
        finalFocusEl={() => finalFocusRef.current}
        defaultValue="Final fantasy"
        fontSize="xl"
      >
        <Editable.Preview />
        <Editable.Input />
        <Editable.Control>
          <Editable.EditTrigger>Edit</Editable.EditTrigger>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>
    </>
  )
}
