import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { runTransform } from "../src/run-transform"

describe("runTransform cross-file saving", () => {
  let dir: string

  beforeAll(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "chakra-codemod-"))
    fs.writeFileSync(
      path.join(dir, "colors.ts"),
      `export const colors = {\n  brand: {\n    500: '#0066cc',\n  },\n}\n`,
    )
    fs.writeFileSync(
      path.join(dir, "theme.ts"),
      `import { extendTheme } from '@chakra-ui/react'\nimport { colors } from './colors'\n\nconst theme = extendTheme({ colors })\n\nexport default theme\n`,
    )
  })

  afterAll(() => {
    fs.rmSync(dir, { recursive: true, force: true })
  })

  it("writes the imported token file rewritten by theme-tokens", async () => {
    const result = await runTransform("theme-tokens", dir, { upgrade: true })

    const colorsOnDisk = fs.readFileSync(path.join(dir, "colors.ts"), "utf8")
    expect(colorsOnDisk).toMatch(/value:\s*["']#0066cc["']/)

    const themeOnDisk = fs.readFileSync(path.join(dir, "theme.ts"), "utf8")
    expect(themeOnDisk).toContain("createSystem(defaultConfig")

    expect(result.files.some((f) => f.endsWith("colors.ts"))).toBe(true)
  })
})
