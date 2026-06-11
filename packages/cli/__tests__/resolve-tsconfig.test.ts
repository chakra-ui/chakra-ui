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

  it("picks the reference that includes the source file when no paths exist", async () => {
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

  it("picks the matching reference regardless of reference order", async () => {
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
    // get-tsconfig merges extends into the parsed tsconfig, so paths should be visible
    expect(result).toBe(appTsconfigPath)
  })

  it("picks non-first reference with inherited paths over first reference without", async () => {
    // The matched config inherits its `paths` via `extends`. parseTsconfig
    // resolves the extends chain, so the returned config still exposes the
    // inherited paths to downstream consumers (e.g. esbuild).
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

  it("falls back to the root config when no reference includes the source file", async () => {
    const rootTsconfigPath = join(testDir, "tsconfig.json")
    writeFileSync(
      rootTsconfigPath,
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.node.json" }],
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
    expect(result).toBe(rootTsconfigPath)
  })

  it("resolves nested project references", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.solution.json" }],
      }),
    )

    // intermediate solution-style config referencing the app config
    writeFileSync(
      join(testDir, "tsconfig.solution.json"),
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.app.json" }],
      }),
    )

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

  it("tolerates circular and missing references", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [
          // circular: points back to the root config
          { path: "./tsconfig.json" },
          // missing: file does not exist
          { path: "./tsconfig.missing.json" },
          { path: "./tsconfig.app.json" },
        ],
      }),
    )

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
