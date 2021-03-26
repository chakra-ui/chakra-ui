import { isInputEvent } from "../src"

test("is input event", () => {
  expect(isInputEvent({ target: {} })).toBeTruthy()
})
