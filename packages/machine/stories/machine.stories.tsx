import * as React from "react"
import { createMachine, useMachine } from "../src"

export default {
  title: "Machine",
}

const counter = createMachine(
  {
    context: { count: 0 },
    on: {
      DEC: { cond: "isAboveMin", actions: "decrementCount" },
      INC: { actions: "incrementCount" },
    },
  },
  {
    computed: {
      formatted(ctx) {
        return `$${ctx.count}`
      },
    },
    actions: {
      decrementCount(context) {
        context.count--
      },
      incrementCount(context) {
        context.count++
      },
    },
    guards: {
      isAboveMin(context) {
        return context.count > 0
      },
    },
  },
)

export const Counter = () => {
  const [state, send] = useMachine(counter)
  return (
    <div>
      <pre>{JSON.stringify(state, null, 3)}</pre>
      <button onClick={() => send("INC")}>INC</button>
      <button onClick={() => send("DEC")}>DEC</button>
    </div>
  )
}
