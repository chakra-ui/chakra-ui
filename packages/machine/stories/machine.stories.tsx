import * as React from "react"
import { createMachine, useMachine } from "../src"

export default {
  title: "Machine",
}

type Context = { value: number }
type State = "idle" | "next"

const counter = createMachine<Context, State>(
  {
    id: "counter",
    initial: "idle",
    context: {
      value: 0,
    },
    computed: {
      isMore(ctx) {
        return ctx.value > 4
      },
    },
    states: {
      idle: {
        on: {
          SPIN: "next",
          INC: {
            actions: "increment",
          },
          DEC: {
            actions: "decrement",
          },
        },
      },
      next: {
        // always: {
        //   target: "idle",
        //   actions: [
        //     () => {
        //       console.log("always")
        //     },
        //     (ctx) => {
        //       ctx.value = ctx.value + 5
        //     },
        //   ],
        // },
        after: {
          5000: "idle",
          6000: {
            actions: () => {
              console.log("hey!")
            },
          },
        },
        every: {
          BASE_INTERVAL: "increment",
        },
        on: {
          STOP: "idle",
        },
      },
    },
  },
  {
    intervals: {
      BASE_INTERVAL: 1000,
    },
    actions: {
      decrement(ctx) {
        ctx.value--
      },
      increment(ctx) {
        ctx.value++
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
      <br />
      <button onClick={() => send("SPIN")}>SPIN</button>
      <button onClick={() => send("STOP")}>STOP</button>
    </div>
  )
}
