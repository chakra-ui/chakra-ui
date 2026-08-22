import { render, screen } from "@testing-library/react"
import * as React from "react"
import { vi } from "vitest"
import { mergeRefs } from "../src/merge-refs"

// Mock React 19
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>()
  return {
    ...actual,
    version: "19.0.0",
  }
})

describe("mergeRefs - React 19", () => {
  test("should return cleanup function in React 19", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const mergedRef = mergeRefs(ref1, ref2, callbackRef)
    const mockElement = document.createElement("div")
    const result = mergedRef(mockElement)

    // React 19 should return cleanup function
    expect(typeof result).toBe("function")
    expect(ref1.current).toBe(mockElement)
    expect(ref2.current).toBe(mockElement)
    expect(callbackRef).toHaveBeenCalledWith(mockElement)

    // Test cleanup function
    if (typeof result === "function") {
      result() // Call cleanup
      expect(ref1.current).toBeNull()
      expect(ref2.current).toBeNull()
      expect(callbackRef).toHaveBeenCalledWith(null)
    }
  })

  test("should handle undefined refs in React 19", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const mergedRef = mergeRefs(ref1, undefined, null)

    const mockElement = document.createElement("div")
    const result = mergedRef(mockElement)

    expect(typeof result).toBe("function")
    expect(ref1.current).toBe(mockElement)
  })

  test("should handle empty refs array in React 19", () => {
    const mergedRef = mergeRefs()

    const mockElement = document.createElement("div")
    const result = mergedRef(mockElement)

    expect(typeof result).toBe("function")
  })

  // Realistic component integration tests
  test("should work with forwardRef component and cleanup", () => {
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

    const { unmount } = render(
      <TestComponent ref={externalRef}>Test Content</TestComponent>,
    )

    const divElement = screen.getByText("Test Content")

    expect(externalRef.current).toBe(divElement)
    expect(callbackRef).toHaveBeenCalledWith(divElement)

    // Test cleanup on unmount
    unmount()
    expect(externalRef.current).toBeNull()
  })

  test("should handle mixed ref types with cleanup", () => {
    const objectRef = React.createRef<HTMLInputElement>()
    const callbackRef1 = vi.fn()
    const callbackRef2 = vi.fn()

    const mergedRef = mergeRefs(objectRef, callbackRef1, callbackRef2)
    const inputElement = document.createElement("input")
    const result = mergedRef(inputElement)

    expect(typeof result).toBe("function")
    expect(objectRef.current).toBe(inputElement)
    expect(callbackRef1).toHaveBeenCalledWith(inputElement)
    expect(callbackRef2).toHaveBeenCalledWith(inputElement)

    // Test cleanup
    if (typeof result === "function") {
      result()
      expect(objectRef.current).toBeNull()
      expect(callbackRef1).toHaveBeenCalledWith(null)
      expect(callbackRef2).toHaveBeenCalledWith(null)
    }
  })

  test("should handle ref updates with proper cleanup", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const mergedRef = mergeRefs(ref1, ref2, callbackRef)

    // First assignment
    const element1 = document.createElement("div")
    const cleanup1 = mergedRef(element1)

    expect(ref1.current).toBe(element1)
    expect(ref2.current).toBe(element1)
    expect(callbackRef).toHaveBeenCalledWith(element1)
    expect(typeof cleanup1).toBe("function")

    // Update to new element
    const element2 = document.createElement("div")
    const cleanup2 = mergedRef(element2)

    expect(ref1.current).toBe(element2)
    expect(ref2.current).toBe(element2)
    expect(callbackRef).toHaveBeenCalledWith(element2)
    expect(callbackRef).toHaveBeenCalledTimes(2)
    expect(typeof cleanup2).toBe("function")

    // Test cleanup
    if (typeof cleanup2 === "function") {
      cleanup2()
      expect(ref1.current).toBeNull()
      expect(ref2.current).toBeNull()
      expect(callbackRef).toHaveBeenCalledWith(null)
    }
  })

  test("should handle null assignment with cleanup", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const callbackRef = vi.fn()

    const mergedRef = mergeRefs(ref1, callbackRef)

    // Assign element first
    const element = document.createElement("div")
    const cleanup = mergedRef(element)

    expect(ref1.current).toBe(element)
    expect(callbackRef).toHaveBeenCalledWith(element)
    expect(typeof cleanup).toBe("function")

    // Assign null (component unmount)
    const nullCleanup = mergedRef(null)

    expect(ref1.current).toBeNull()
    expect(callbackRef).toHaveBeenCalledWith(null)
    expect(callbackRef).toHaveBeenCalledTimes(2)
    expect(typeof nullCleanup).toBe("function")
  })

  test("should work with form elements and cleanup", () => {
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
    const { unmount } = render(
      <TestInput ref={externalRef} placeholder="Enter text" />,
    )

    const inputElement = screen.getByPlaceholderText("Enter text")

    expect(externalRef.current).toBe(inputElement)
    expect(focusRef).toHaveBeenCalledWith(inputElement)

    // Test cleanup on unmount
    unmount()
    expect(externalRef.current).toBeNull()
  })

  test("should handle callback refs that return cleanup functions", () => {
    const ref1 = React.createRef<HTMLDivElement>()
    const cleanupFn = vi.fn()
    const callbackRef = vi.fn().mockReturnValue(cleanupFn)

    const mergedRef = mergeRefs(ref1, callbackRef)
    const element = document.createElement("div")
    const result = mergedRef(element)

    // In React 19, we should return cleanup function
    expect(typeof result).toBe("function")
    expect(ref1.current).toBe(element)
    expect(callbackRef).toHaveBeenCalledWith(element)

    // Test cleanup
    if (typeof result === "function") {
      result()
      expect(ref1.current).toBeNull()
      // The callback ref should only be called once (with the element)
      // The cleanup function returned by the callback ref should be called
      expect(callbackRef).toHaveBeenCalledTimes(1)
      expect(callbackRef).toHaveBeenCalledWith(element)
      expect(cleanupFn).toHaveBeenCalledTimes(1)
    }
  })

  test("should handle complex component scenarios", () => {
    const externalRef = React.createRef<HTMLDivElement>()
    const focusRef = vi.fn()
    const measureRef = vi.fn()

    const ComplexComponent = React.forwardRef<
      HTMLDivElement,
      {
        children: React.ReactNode
        onFocus?: () => void
      }
    >(function ComplexComponent(props, ref) {
      const { children, onFocus } = props
      const localRef = React.useRef<HTMLDivElement>(null)
      const combinedRef = mergeRefs(ref, localRef, focusRef, measureRef)

      return (
        <div ref={combinedRef} onFocus={onFocus} tabIndex={0}>
          {children}
        </div>
      )
    })

    const onFocus = vi.fn()
    const { unmount } = render(
      <ComplexComponent ref={externalRef} onFocus={onFocus}>
        Complex Content
      </ComplexComponent>,
    )

    const divElement = screen.getByText("Complex Content")

    expect(externalRef.current).toBe(divElement)
    expect(focusRef).toHaveBeenCalledWith(divElement)
    expect(measureRef).toHaveBeenCalledWith(divElement)

    // Test cleanup on unmount
    unmount()
    expect(externalRef.current).toBeNull()
  })
})
