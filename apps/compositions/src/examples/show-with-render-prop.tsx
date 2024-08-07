import { Show } from "@chakra-ui/react"

export const ShowWithRenderProp = () => {
  let value: number | undefined = 10
  return <Show when={value}>{(value) => <div>Value: {value}</div>}</Show>
}
