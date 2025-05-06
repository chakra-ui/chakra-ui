import { For, Radiomark, Stack } from "@sh3yk0-ui/react"

export const RadiomarkVariants = () => {
  return (
    <Stack>
      <For each={["outline", "subtle", "solid", "inverted"]}>
        {(variant) => <Radiomark checked key={variant} variant={variant} />}
      </For>
    </Stack>
  )
}
