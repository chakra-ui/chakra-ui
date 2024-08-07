import { For } from "@chakra-ui/react"

export const ForBasic = () => {
  return (
    <For each={["One", "Two", "Three"]}>
      {(item, index) => <div key={index}>{item}</div>}
    </For>
  )
}
