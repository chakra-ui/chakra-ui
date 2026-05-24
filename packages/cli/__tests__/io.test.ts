import { mkdirSync, rmSync, writeFileSync } from "node:fs"
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

describe("io.read", () => {
  let testDir: string

  beforeEach(() => {
    testDir = join(tmpdir(), `chakra-cli-io-test-${Date.now()}`)
    mkdirSync(testDir, { recursive: true })
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

  it("explains when the default export is not a Chakra system", async () => {
    const source = join(testDir, "config.ts")
    writeFileSync(source, "export default { theme: { tokens: {} } }")

    await expect(readInput(source, testDir)).rejects.toThrow(
      /No Chakra system export found/,
    )
    await expect(readInput(source, testDir)).rejects.toThrow(
      'Found export: "default".',
    )
    await expect(readInput(source, testDir)).rejects.toThrow(
      "defineConfig(...)",
    )
    await expect(readInput(source, testDir)).rejects.toThrow(
      "createSystem(defaultConfig, config)",
    )
  })

  it("lists named exports when no Chakra system export is found", async () => {
    const source = join(testDir, "theme.ts")
    writeFileSync(source, "export const theme = { tokens: {} }")

    await expect(readInput(source, testDir)).rejects.toThrow(
      'Found export: "theme".',
    )
    await expect(readInput(source, testDir)).rejects.toThrow(
      'expects "default", "preset", "system"',
    )
  })
})
