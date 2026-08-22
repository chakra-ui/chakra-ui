import { render, screen } from "@testing-library/react"
import * as React from "react"
import { vi } from "vitest"
import { mergeRefs } from "../src/merge-refs"

// Mock React 18
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>()
  return {
    ...actual,
    version: "18.2.0",
  }
})

describe("mergeRefs - React 18", () => {
  test("should not return cleanup function in React 18", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const mergedRef = mergeRefs(ref1, ref2, callbackRef)
    const mockElement = document.createElement("div")
    const result = mergedRef(mockElement)

    // React 18 should not return cleanup function
    expect(result).toBeUndefined()
    expect(ref1.current).toBe(mockElement)
    expect(ref2.current).toBe(mockElement)
    expect(callbackRef).toHaveBeenCalledWith(mockElement)
  })

  test("should handle undefined refs in React 18", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const mergedRef = mergeRefs(ref1, undefined, null)

    const mockElement = document.createElement("div")
    const result = mergedRef(mockElement)

    expect(result).toBeUndefined()
    expect(ref1.current).toBe(mockElement)
  })

  test("should handle empty refs array in React 18", () => {
    const mergedRef = mergeRefs()

    const mockElement = document.createElement("div")
    const result = mergedRef(mockElement)

    expect(result).toBeUndefined()
  })

  // Realistic component integration tests
  test("should work with forwardRef component", () => {
    const externalRef = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const TestComponent = React.forwardRef<
      HTMLDivElement,
      { children: React.ReactNode }
    >(function TestComponent(props, ref) {
      const { children } = props
      const localRef = React.useRef<HTMLDivElement>(null)
      const combinedRef = mergeRefs(ref, localRef, callbackRef)

      return <div ref={combinedRef}>{children}</div>
    })

    render(<TestComponent ref={externalRef}>Test Content</TestComponent>)

    const divElement = screen.getByText("Test Content")

    expect(externalRef.current).toBe(divElement)
    expect(callbackRef).toHaveBeenCalledWith(divElement)
  })

  test("should handle mixed ref types (object refs and callback refs)", () => {
    const objectRef = React.createRef<HTMLInputElement>()
    const callbackRef1 = vi.fn()
    const callbackRef2 = vi.fn()

    const mergedRef = mergeRefs(objectRef, callbackRef1, callbackRef2)
    const inputElement = document.createElement("input")
    const result = mergedRef(inputElement)

    expect(result).toBeUndefined()
    expect(objectRef.current).toBe(inputElement)
    expect(callbackRef1).toHaveBeenCalledWith(inputElement)
    expect(callbackRef2).toHaveBeenCalledWith(inputElement)
  })

  test("should handle ref updates correctly", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const mergedRef = mergeRefs(ref1, ref2, callbackRef)

    // First assignment
    const element1 = document.createElement("div")
    mergedRef(element1)

    expect(ref1.current).toBe(element1)
    expect(ref2.current).toBe(element1)
    expect(callbackRef).toHaveBeenCalledWith(element1)

    // Update to new element
    const element2 = document.createElement("div")
    mergedRef(element2)

    expect(ref1.current).toBe(element2)
    expect(ref2.current).toBe(element2)
    expect(callbackRef).toHaveBeenCalledWith(element2)
    expect(callbackRef).toHaveBeenCalledTimes(2)
  })

  test("should handle null assignment", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const mergedRef = mergeRefs(ref1, callbackRef)

    // Assign element first
    const element = document.createElement("div")
    mergedRef(element)

    expect(ref1.current).toBe(element)
    expect(callbackRef).toHaveBeenCalledWith(element)

    // Assign null (component unmount)
    mergedRef(null)

    expect(ref1.current).toBeNull()
    expect(callbackRef).toHaveBeenCalledWith(null)
    expect(callbackRef).toHaveBeenCalledTimes(2)
  })

  test("should work with form elements", () => {
    const focusRef = vi.fn()

    const TestInput = React.forwardRef<
      HTMLInputElement,
      { placeholder: string }
    >(function TestInput(props, ref) {
      const { placeholder } = props
      const localRef = React.useRef<HTMLInputElement>(null)
      const combinedRef = mergeRefs(ref, localRef, focusRef)

      return <input ref={combinedRef} placeholder={placeholder} />
    })

    const externalRef = React.createRef<HTMLInputElement>()
    render(<TestInput ref={externalRef} placeholder="Enter text" />)

    const inputElement = screen.getByPlaceholderText("Enter text")

    expect(externalRef.current).toBe(inputElement)
    expect(focusRef).toHaveBeenCalledWith(inputElement)
  })

  test("should handle callback refs that return values", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn().mockReturnValue("cleanup")

    const mergedRef = mergeRefs(ref1, callbackRef)
    const element = document.createElement("div")
    const result = mergedRef(element)

    // In React 18, we don't return cleanup even if callback refs do
    expect(result).toBeUndefined()
    expect(ref1.current).toBe(element)
    expect(callbackRef).toHaveBeenCalledWith(element)
  })
})
