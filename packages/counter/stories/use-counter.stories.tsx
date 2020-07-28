import React, { useState } from "react"
import { useCounter } from "../src"

export default {
  title: "Counter",
}

export function Basic() {
  const [val, setVal] = useState("8...4,.4")
  const {
    value,
    valueAsNumber,
    isOutOfRange,
    increment,
    update,
    decrement,
  } = useCounter({
    value: val,
    // defaultValue: "8...4,.4",
    max: 10,
    min: 0,
    // step: 0.1,
    keepWithinRange: false,
    precision: 4,
    onChange: (next) => setVal(next),
  })

  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            value: value,
            valueAsNumber: valueAsNumber,
            outOfRange: isOutOfRange,
          },
          null,
          2,
        )}
      </pre>
      <br />
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <input
        value={value}
        style={{ background: "transparent" }}
        onChange={(e) => update(e.target.value)}
      />
    </div>
  )
}
