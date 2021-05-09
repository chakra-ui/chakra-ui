import * as React from "react"
import { createControllableMachine, useControllableMachine } from "../src"

export default {
  title: "Machine / Controlled",
}

const counter = createControllableMachine({
  context: {
    value: 0,
    min: 0,
    max: 10,
  },
  on: {
    INC: {
      cond: (ctx) => ctx.value < ctx.max,
      actions: (ctx) => {
        ctx.setValue?.(ctx.value + 1)
      },
    },
    DEC: {
      cond: (ctx) => ctx.value > ctx.min,
      actions: (ctx) => {
        ctx.setValue?.(ctx.value - 1)
      },
    },
  },
})

const Counter = (props: any) => {
  const { value, defaultValue, onChange } = props

  const [state, send] = useControllableMachine(counter, {
    defaultValue,
    value,
    onChange,
  })

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => send("INC")}>Increment</button>
      <button onClick={() => send("DEC")}>Decrement</button>
    </div>
  )
}

export const CounterExample = () => {
  const [value, setValue] = React.useState(10)

  return (
    <div>
      <p>Value is: {value}</p>
      <Counter value={value} onChange={setValue} />
    </div>
  )
}
