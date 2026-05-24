import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { TextEncoder } from "node:util"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

const nodeUint8Array = new TextEncoder().encode("").constructor

const readInput = async (file: string, cwd: string) => {
  Object.defineProperties(globalThis, {
    TextEncoder: {
      configurable: true,
      value: TextEncoder,
    },
    Uint8Array: {
      configurable: true,
      value: nodeUint8Array,
    },
  })

  const { read } = await import("../src/utils/io")
  return read(file, { cwd })
}

const getReadError = async (file: string, cwd: string) => {
  try {
    await readInput(file, cwd)
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
    return error as Error
  }

  throw new Error("Expected io.read to throw")
}

describe("io.read", () => {
  let testDir: string

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), "chakra-cli-io-test-"))
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
  })

  it("accepts a default Chakra system export", async () => {
    const source = join(testDir, "system.ts")
    writeFileSync(source, "export default { $$chakra: true }")

    const result = await readInput(source, testDir)

    expect(result.mod).toMatchObject({ $$chakra: true })
  })

  it.each(["preset", "system"] as const)(
    "accepts a named %s Chakra system export",
    async (exportName) => {
      const source = join(testDir, `${exportName}.ts`)
      writeFileSync(source, `export const ${exportName} = { $$chakra: true }`)

      const result = await readInput(source, testDir)

      expect(result.mod).toMatchObject({ $$chakra: true })
    },
  )

  it("accepts a CommonJS Chakra system export", async () => {
    const source = join(testDir, "system.cjs")
    writeFileSync(source, "module.exports = { $$chakra: true }")

    const result = await readInput(source, testDir)

    expect(result.mod).toMatchObject({ $$chakra: true })
  })

  it("explains when the default export is not a Chakra system", async () => {
    const source = join(testDir, "config.ts")
    writeFileSync(source, "export default { theme: { tokens: {} } }")

    const error = await getReadError(source, testDir)

    expect(error.message).toContain("No Chakra system export found")
    expect(error.message).toContain('Found export: "default".')
    expect(error.message).toContain("defineConfig(...)")
    expect(error.message).toContain("createSystem(defaultConfig, config)")
  })

  it("lists named exports when no Chakra system export is found", async () => {
    const source = join(testDir, "theme.ts")
    writeFileSync(source, "export const theme = { tokens: {} }")

    const error = await getReadError(source, testDir)

    expect(error.message).toContain('Found export: "theme".')
    expect(error.message).toContain('expects "default", "preset", "system"')
  })
})
