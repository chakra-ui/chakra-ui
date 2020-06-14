import * as React from "react"
import { useCounter } from "../src"

export default {
  title: "Counter",
}

export function Basic() {
  const [val, setVal] = React.useState<any>("8...4,.4")
  const counter = useCounter({
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
            value: counter.value,
            valueAsNumber: counter.valueAsNumber,
            outOfRange: counter.isOutOfRange,
          },
          null,
          2,
        )}
      </pre>
      <br />
      <button onClick={() => counter.increment()}>Increment</button>
      <button onClick={() => counter.decrement()}>Decrement</button>
      <input
        value={counter.value}
        style={{ background: "transparent" }}
        onChange={(e) => counter.update(e.target.value)}
      />
    </div>
  )
}
