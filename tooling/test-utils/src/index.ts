import { mockImage } from "./mock-image"

export { act, fireEvent, screen, waitFor } from "@testing-library/react"
export * as hooks from "@testing-library/react-hooks"
export * as ssr from "@testing-library/react-hooks/server"
export * from "./accessibility"
export * from "./press"
export { render } from "./render"

export const mocks = {
  image: mockImage,
}
