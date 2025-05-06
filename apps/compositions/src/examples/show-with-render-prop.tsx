import { Show } from "@sh3yk0-ui/react"

export const ShowWithRenderProp = () => {
  const value: number | undefined = 10
  return <Show when={value}>{(value) => <div>Value: {value}</div>}</Show>
}
