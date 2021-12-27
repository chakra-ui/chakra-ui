import { formatWithPrettierIfAvailable } from "../src/utils/format-with-prettier"

describe("Format With Prettier", () => {
  it("should format with prettier", async () => {
    const content =
      "export interface ThemeTypings { fonts: 'test1'|'test2'|'test3'}"

    const pretty = await formatWithPrettierIfAvailable(content)

    expect(pretty).toMatchInlineSnapshot(`
      "export interface ThemeTypings {
        fonts: \\"test1\\" | \\"test2\\" | \\"test3\\"
      }
      "
    `)
  })
})
