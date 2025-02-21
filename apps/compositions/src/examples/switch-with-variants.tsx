import { For, HStack, Switch } from "@chakra-ui/react"

export const SwitchWithVariants = () => {
  return (
    <HStack gap="8">
      <For each={["raised", "solid"]}>
        {(variant) => (
          <Switch.Root key={variant} variant={variant}>
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label />
          </Switch.Root>
        )}
      </For>
    </HStack>
  )
}
