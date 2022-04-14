import { mockImage } from "./mock-image"

export { act, fireEvent, screen, waitFor } from "@testing-library/react"
export * as ssr from "@testing-library/react-hooks/server"
export * from "./accessibility"
export * from "./hooks"
export * from "./press"
export { render } from "./render"
export { focus, blur } from "./focus"

export const mocks = {
  image: mockImage,
}
