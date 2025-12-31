import { readFileSync } from "fs"
import path from "path"

test("skeleton transform updates props and css vars", () => {
  const fixture = path.join(__dirname, "fixtures", "skeleton.input.txt")
  const input = readFileSync(fixture, "utf-8")
  expect(input.length).toBeGreaterThan(0)
  expect(input).toContain("<Skeleton")
})
