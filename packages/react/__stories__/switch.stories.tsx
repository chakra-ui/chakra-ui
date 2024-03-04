import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Field, HStack, Stack, Switch, chakra } from "../src"

export default {
  title: "Forms / Switch",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="lg" mx="auto" mt={6} p={6}>
        {story()}
      </chakra.div>
    ),
  ],
}

const DemoSwitch = (props: Switch.RootProps) => {
  return (
    <Switch.Root {...props}>
      <Switch.Track>
        <Switch.Thumb />
      </Switch.Track>
      {props.children && <Switch.Label>{props.children}</Switch.Label>}
    </Switch.Root>
  )
}

export const Base = () => <DemoSwitch colorScheme="green" />

export const Disabled = () => (
  <DemoSwitch isDisabled size="md" colorScheme="blue" margin="20px" />
)

export const Readonly = () => (
  <DemoSwitch isReadOnly size="md" colorScheme="blue" margin="20px" />
)

export const Invalid = () => (
  <DemoSwitch isInvalid size="md" colorScheme="blue" margin="20px" />
)

export const Usage = () => (
  <chakra.div display="flex" justifyContent="center" alignItems="center">
    <chakra.label htmlFor="email-alerts" mr="16px">
      Enable email alerts?
    </chakra.label>
    <DemoSwitch colorScheme="green" id="email-alerts" />
  </chakra.div>
)

export const Sizes = () => {
  return (
    <HStack>
      <DemoSwitch size="sm" colorScheme="green" />
      <DemoSwitch size="md" colorScheme="green" />
      <DemoSwitch size="lg" colorScheme="green" />
    </HStack>
  )
}

export const Controlled = () => {
  const [checked, setChecked] = React.useState(true)

  return (
    <>
      {checked ? "Checked" : "Unchecked"}
      <DemoSwitch
        isChecked={checked}
        colorScheme="blue"
        onChange={(e) => setChecked(e.target.checked)}
      />
    </>
  )
}

export const WithReactHookForm = () => {
  const defaultValues = {
    name: "Hello",
    boolean: true,
    test: true,
  }

  const { handleSubmit, register } = useForm({
    defaultValues,
  })

  const onSubmit: SubmitHandler<any> = (values) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="name" {...register("name")} />
      <DemoSwitch {...register("boolean")} />
      <button type="submit">Submit</button>
    </form>
  )
}

export const WithFormControl = () => {
  return (
    <>
      <Field.Root id="optIn">
        <Field.Label>Opt-in Example</Field.Label>
        <Stack>
          <DemoSwitch value="1">Opt-in 1</DemoSwitch>
          <DemoSwitch value="2">Opt-in 2</DemoSwitch>
          <DemoSwitch value="3">Opt-in 3</DemoSwitch>
        </Stack>
      </Field.Root>

      <Field.Root id="optInInvalid" isInvalid mt={4}>
        <Field.Label>Invalid Opt-in Example</Field.Label>
        <Stack spacing={2}>
          <DemoSwitch value="1">Invalid Opt-in 1</DemoSwitch>
          <DemoSwitch value="2">Invalid Opt-in 2</DemoSwitch>
          <DemoSwitch value="3">Invalid Opt-in 3</DemoSwitch>
        </Stack>
      </Field.Root>

      <Field.Root id="optInDisabled" isDisabled mt={4}>
        <Field.Label>Disabled Opt-in Example</Field.Label>
        <Stack spacing={2}>
          <DemoSwitch value="1">Disabled Opt-in 1</DemoSwitch>
          <DemoSwitch value="2">Disabled Opt-in 2</DemoSwitch>
          <DemoSwitch value="3">Disabled Opt-in 3</DemoSwitch>
        </Stack>
      </Field.Root>

      <Field.Root id="optInReadonly" isReadOnly mt={4}>
        <Field.Label>Readonly Opt-in Example</Field.Label>
        <Stack spacing={2}>
          <DemoSwitch value="1">Readonly Opt-in 1</DemoSwitch>
          <DemoSwitch value="2">Readonly Opt-in 2</DemoSwitch>
          <DemoSwitch value="3">Readonly Opt-in 3</DemoSwitch>
        </Stack>
      </Field.Root>

      <Field.Root id="optInRequired" isRequired mt={4}>
        <Field.Label>Required Opt-in Example</Field.Label>
        <Stack spacing={2}>
          <DemoSwitch value="1">Required Opt-in 1</DemoSwitch>
          <DemoSwitch value="2">Required Opt-in 2</DemoSwitch>
          <DemoSwitch value="3">Required Opt-in 3</DemoSwitch>
        </Stack>
      </Field.Root>
    </>
  )
}
