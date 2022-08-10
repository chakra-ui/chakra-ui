import { Meta } from "@storybook/react"
import React, { useRef } from "react"
import { useSize } from "../src"

const meta: Meta = {
  title: "Hooks / useSize",
}

export function MeasureSize() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  return (
    <div>
      <h1>Measure Size</h1>
      <div ref={ref} style={{ background: "red", border: "1px dashed black" }}>
        {JSON.stringify(size, null, 4)}
      </div>
    </div>
  )
}

export default meta
