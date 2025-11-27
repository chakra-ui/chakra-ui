import { describe, expect, it } from "vitest"
import { convertTsxToJsx } from "../src/utils/convert-tsx-to-jsx"

describe("convertTsxToJsx", () => {
  it("should convert TypeScript to JavaScript", async () => {
    const input = `
      const message: string = "Hello World"
      const count: number = 42
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "const message = 'Hello World'
      const count = 42
      "
    `)
  })

  it("should preserve JSX syntax", async () => {
    const input = `
      const Component = () => {
        return <div className="container">Hello</div>
      }
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "const Component = () => {
        return <div className='container'>Hello</div>
      }
      "
    `)
  })

  it("should handle TypeScript interfaces", async () => {
    const input = `
      interface Props {
        name: string
        age: number
      }
      
      const Component = (props: Props) => {
        return <div>{props.name}</div>
      }
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "const Component = (props) => {
        return <div>{props.name}</div>
      }
      "
    `)
  })

  it("should handle TypeScript generics", async () => {
    const input = `
      function identity<T>(arg: T): T {
        return arg
      }
      
      const result = identity<string>("hello")
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "function identity(arg) {
        return arg
      }

      const result = identity('hello')
      "
    `)
  })

  it("should preserve React imports", async () => {
    const input = `
      import React from 'react'
      import { useState } from 'react'
      
      const Component = () => {
        const [count, setCount] = useState(0)
        return <div>{count}</div>
      }
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "import React from 'react'
      import { useState } from 'react'

      const Component = () => {
        const [count, setCount] = useState(0)
        return <div>{count}</div>
      }
      "
    `)
  })

  it("should handle TypeScript enums", async () => {
    const input = `
      enum Color {
        Red = "RED",
        Green = "GREEN",
        Blue = "BLUE"
      }
      
      const myColor = Color.Red
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "var Color = /*#__PURE__*/ (function (Color) {
        Color['Red'] = 'RED'
        Color['Green'] = 'GREEN'
        Color['Blue'] = 'BLUE'
        return Color
      })(Color || {})

      const myColor = Color.Red
      "
    `)
  })

  it("should handle async/await syntax", async () => {
    const input = `
      async function fetchData(): Promise<string> {
        const response = await fetch('/api/data')
        return response.text()
      }
    `
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "async function fetchData() {
        const response = await fetch('/api/data')
        return response.text()
      }
      "
    `)
  })

  it("should format output with prettier", async () => {
    const input = `const Component=()=>{return<div>Hello</div>}`
    const result = await convertTsxToJsx(input)
    expect(result).toMatchInlineSnapshot(`
      "const Component = () => {
        return <div>Hello</div>
      }
      "
    `)
  })
})
