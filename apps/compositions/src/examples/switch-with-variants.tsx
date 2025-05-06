import { For, HStack, Switch } from "@sh3yk0-ui/react"

export const SwitchWithVariants = () => {
  return (
    <HStack gap="8">
      <For each={["raised", "solid"]}>
        {(variant) => (
          <Switch.Root key={variant} variant={variant}>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label />
          </Switch.Root>
        )}
      </For>
    </HStack>
  )
}
