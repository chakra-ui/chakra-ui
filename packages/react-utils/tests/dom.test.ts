import { normalizeEventKey } from "../src"

test("should normalize keyboard events", () => {
  const keyboardEvent: any = { key: "Left", keyCode: 38 }
  expect(normalizeEventKey(keyboardEvent)).toBe("ArrowLeft")
})
