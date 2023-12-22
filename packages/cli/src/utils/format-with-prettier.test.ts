import { formatWithPrettier } from "./format-with-prettier.js"

describe("Format With Prettier", () => {
  it("should format with prettier", async () => {
    const content =
      "export interface ThemeTypings { fonts: 'test1'|'test2'|'test3'}"

    const pretty = await formatWithPrettier(content)

    expect(pretty).toMatchInlineSnapshot(`
      "export interface ThemeTypings {
        fonts: "test1" | "test2" | "test3"
      }
      "
    `)
  })
})
