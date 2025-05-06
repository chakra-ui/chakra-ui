import { HStack } from "@sh3yk0-ui/react"
import { ColorSwatch } from "@sh3yk0-ui/react"
import { For } from "@sh3yk0-ui/react"

export const ColorSwatchWithSizes = () => {
  return (
    <HStack>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => <ColorSwatch key={size} value="#bada55" size={size} />}
      </For>
    </HStack>
  )
}
