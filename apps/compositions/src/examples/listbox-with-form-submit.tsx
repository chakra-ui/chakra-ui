"use client"

import {
  Button,
  Field,
  Listbox,
  Stack,
  createListCollection,
  useListboxContext,
} from "@chakra-ui/react"

// Hidden input to capture the listbox value for native form submit
const ListboxHiddenInput = (props: React.ComponentProps<"input">) => {
  const listbox = useListboxContext()
  // Listbox value is an array of strings (even for single-select)
  return (
    <input type="hidden" value={listbox.value[0] ?? ""} readOnly {...props} />
  )
}

export const ListboxWithFormSubmit = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const framework = formData.get("framework")
    console.log("Form submitted with framework:", framework)
    alert(`Selected framework: ${framework}`)
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Field.Root width="320px">
          <Listbox.Root collection={frameworks}>
            <Listbox.Label>Select framework</Listbox.Label>
            <Listbox.Content>
              {frameworks.items.map((item) => (
                <Listbox.Item key={item.value} item={item}>
                  <Listbox.ItemText>{item.label}</Listbox.ItemText>
                  <Listbox.ItemIndicator />
                </Listbox.Item>
              ))}
            </Listbox.Content>

            <ListboxHiddenInput name="framework" />
          </Listbox.Root>
          <Field.HelperText>
            The form will submit the framework value (e.g. "react").
          </Field.HelperText>
        </Field.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})
