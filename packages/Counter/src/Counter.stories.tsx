import React from "react"
import { useCounter } from "./Counter"

export default {
  title: "Counter",
}

export function Basic() {
  const counter = useCounter({
    defaultValue: 1.53,
    max: 10,
    min: 0,
    step: 0.1,
    keepWithinRange: true,
    precision: 4,
    onChange: console.log,
  })

  return (
    <div>
      <div>current: {counter.value}</div>
      <br />
      <button onClick={() => counter.increment()} disabled={counter.isAtMax}>
        Increment
      </button>
      <button onClick={() => counter.decrement()} disabled={counter.isAtMin}>
        Decrement
      </button>
    </div>
  )
}
