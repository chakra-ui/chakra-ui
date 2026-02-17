import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { resolveTsconfig } from "../src/utils/resolve-tsconfig"

describe("resolveTsconfig", () => {
  let testDir: string

  beforeEach(() => {
    testDir = join(tmpdir(), `chakra-cli-test-${Date.now()}`)
    mkdirSync(testDir, { recursive: true })
    mkdirSync(join(testDir, "src"), { recursive: true })
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
  })

  it("returns explicit tsconfig path when provided", async () => {
    const tsconfigPath = join(testDir, "tsconfig.custom.json")
    writeFileSync(tsconfigPath, JSON.stringify({ compilerOptions: {} }))

    const result = await resolveTsconfig(
      join(testDir, "src/index.ts"),
      tsconfigPath,
    )
    expect(result).toBe(tsconfigPath)
  })

  it("finds tsconfig.json for a source file", async () => {
    const tsconfigPath = join(testDir, "tsconfig.json")
    writeFileSync(
      tsconfigPath,
      JSON.stringify({
        compilerOptions: {
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    expect(result).toBe(tsconfigPath)
  })

  it("resolves solution-style tsconfig with references", async () => {
    // Root tsconfig.json (solution-style)
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [
          { path: "./tsconfig.app.json" },
          { path: "./tsconfig.node.json" },
        ],
      }),
    )

    // tsconfig.app.json with paths
    const appTsconfigPath = join(testDir, "tsconfig.app.json")
    writeFileSync(
      appTsconfigPath,
      JSON.stringify({
        compilerOptions: {
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      }),
    )

    // tsconfig.node.json without paths
    writeFileSync(
      join(testDir, "tsconfig.node.json"),
      JSON.stringify({
        compilerOptions: {},
        include: ["vite.config.ts"],
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    expect(result).toBe(appTsconfigPath)
  })

  it("falls back to first reference when no paths found", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [
          { path: "./tsconfig.app.json" },
          { path: "./tsconfig.node.json" },
        ],
      }),
    )

    const appTsconfigPath = join(testDir, "tsconfig.app.json")
    writeFileSync(
      appTsconfigPath,
      JSON.stringify({
        compilerOptions: {},
        include: ["src"],
      }),
    )

    writeFileSync(
      join(testDir, "tsconfig.node.json"),
      JSON.stringify({
        compilerOptions: {},
        include: ["vite.config.ts"],
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    expect(result).toBe(appTsconfigPath)
  })

  it("returns undefined when no tsconfig exists", async () => {
    const noConfigDir = join(testDir, "no-config")
    mkdirSync(noConfigDir, { recursive: true })
    writeFileSync(join(noConfigDir, "index.ts"), "export default {}")

    const result = await resolveTsconfig(join(noConfigDir, "index.ts"))
    expect(result).toBeUndefined()
  })

  it("resolves paths inherited via extends chain", async () => {
    // tsconfig.base.json has paths
    writeFileSync(
      join(testDir, "tsconfig.base.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    // tsconfig.json extends base
    const tsconfigPath = join(testDir, "tsconfig.json")
    writeFileSync(
      tsconfigPath,
      JSON.stringify({
        extends: "./tsconfig.base.json",
        include: ["src"],
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    expect(result).toBe(tsconfigPath)
  })

  it("picks the reference with paths when it is not the first one", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [
          { path: "./tsconfig.node.json" },
          { path: "./tsconfig.app.json" },
        ],
      }),
    )

    // node config listed first — no paths
    writeFileSync(
      join(testDir, "tsconfig.node.json"),
      JSON.stringify({
        compilerOptions: {},
        include: ["vite.config.ts"],
      }),
    )

    // app config listed second — has paths
    const appTsconfigPath = join(testDir, "tsconfig.app.json")
    writeFileSync(
      appTsconfigPath,
      JSON.stringify({
        compilerOptions: {
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    expect(result).toBe(appTsconfigPath)
  })

  it("handles reference that itself extends another config with paths", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.app.json" }],
      }),
    )

    // base config with paths
    writeFileSync(
      join(testDir, "tsconfig.base.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    // app config extends base — paths are inherited
    const appTsconfigPath = join(testDir, "tsconfig.app.json")
    writeFileSync(
      appTsconfigPath,
      JSON.stringify({
        extends: "./tsconfig.base.json",
        include: ["src"],
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    // tsconfck merges extends into the parsed tsconfig, so paths should be visible
    expect(result).toBe(appTsconfigPath)
  })

  it("picks non-first reference with inherited paths over first reference without", async () => {
    // This test disambiguates: does tsconfck merge `extends` in referenced
    // configs so our `paths` check finds inherited paths? If not, the fallback
    // would wrongly pick tsconfig.node.json (listed first).
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [
          { path: "./tsconfig.node.json" },
          { path: "./tsconfig.app.json" },
        ],
      }),
    )

    // node config listed first — no paths, no extends
    writeFileSync(
      join(testDir, "tsconfig.node.json"),
      JSON.stringify({
        compilerOptions: {},
        include: ["vite.config.ts"],
      }),
    )

    // base config owns the paths
    writeFileSync(
      join(testDir, "tsconfig.base.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    // app config listed second — inherits paths via extends
    const appTsconfigPath = join(testDir, "tsconfig.app.json")
    writeFileSync(
      appTsconfigPath,
      JSON.stringify({
        extends: "./tsconfig.base.json",
        include: ["src"],
      }),
    )

    writeFileSync(join(testDir, "src/index.ts"), "export default {}")

    const result = await resolveTsconfig(join(testDir, "src/index.ts"))
    expect(result).toBe(appTsconfigPath)
  })

  it("finds tsconfig from deeply nested source file", async () => {
    const tsconfigPath = join(testDir, "tsconfig.json")
    writeFileSync(
      tsconfigPath,
      JSON.stringify({
        compilerOptions: {
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    const deepDir = join(testDir, "src/features/auth/components")
    mkdirSync(deepDir, { recursive: true })
    writeFileSync(join(deepDir, "login.ts"), "export default {}")

    const result = await resolveTsconfig(join(deepDir, "login.ts"))
    expect(result).toBe(tsconfigPath)
  })
})
