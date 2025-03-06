import { Checkbox, CheckboxGroup, Fieldset, For } from "@chakra-ui/react"

export const CheckboxWithGroup = () => {
  return (
    <Fieldset.Root>
      <CheckboxGroup defaultValue={["react"]} name="framework">
        <Fieldset.Legend fontSize="sm" mb="2">
          Select framework
        </Fieldset.Legend>
        <Fieldset.Content>
          <For each={["React", "Svelte", "Vue", "Angular"]}>
            {(value) => (
              <Checkbox.Root key={value} value={value}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{value}</Checkbox.Label>
              </Checkbox.Root>
            )}
          </For>
        </Fieldset.Content>
      </CheckboxGroup>
    </Fieldset.Root>
  )
}
