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
      <h1>Measured Size: {JSON.stringify(size, null, 4)}</h1>
      <div ref={ref} style={{ background: "pink", border: "1px dashed black" }}>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content
      </div>
    </div>
  )
}

export default meta
