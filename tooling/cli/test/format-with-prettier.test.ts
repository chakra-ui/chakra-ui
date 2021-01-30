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

  it("should not fail if prettier is not available", async () => {
    jest.mock("prettier", () => {
      throw new Error("module not found")
    })

    const content =
      "export interface ThemeTypings { fonts: 'test1'|'test2'|'test3'}"
    const pretty = await formatWithPrettierIfAvailable(content)

    expect(pretty).toMatchInlineSnapshot(
      `"export interface ThemeTypings { fonts: 'test1'|'test2'|'test3'}"`,
    )
  })
})
