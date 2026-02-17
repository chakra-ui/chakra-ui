import { build } from "esbuild"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { resolveTsconfig } from "../src/utils/resolve-tsconfig"

/**
 * Integration tests verifying that esbuild can resolve path aliases
 * using the tsconfig resolved by tsconfck.
 */
describe("bundle with tsconfig path aliases", () => {
  let testDir: string

  beforeEach(() => {
    testDir = join(tmpdir(), `chakra-cli-bundle-${Date.now()}`)
    mkdirSync(join(testDir, "src/utils"), { recursive: true })
    mkdirSync(join(testDir, "src/lib"), { recursive: true })
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
  })

  function evalCjs(code: string) {
    const mod = { exports: {} as Record<string, any> }
    new Function("module", "exports", "require", code)(
      mod,
      mod.exports,
      () => ({}),
    )
    return mod.exports
  }

  async function bundleWithTsconfig(entryFile: string, tsconfig?: string) {
    const resolved = await resolveTsconfig(entryFile, tsconfig)
    const result = await build({
      platform: "node",
      format: "cjs",
      absWorkingDir: testDir,
      entryPoints: [entryFile],
      outfile: "out.js",
      write: false,
      bundle: true,
      ...(resolved ? { tsconfig: resolved } : {}),
    })
    return evalCjs(result.outputFiles[0].text)
  }

  it("resolves path aliases with simple tsconfig", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    writeFileSync(
      join(testDir, "src/utils/helper.ts"),
      `export const greet = (name: string) => "hello " + name`,
    )

    writeFileSync(
      join(testDir, "src/index.ts"),
      `import { greet } from "@/utils/helper"\nexport { greet }\nexport default greet("world")`,
    )

    const mod = await bundleWithTsconfig(join(testDir, "src/index.ts"))
    expect(mod.default).toMatchInlineSnapshot(`"hello world"`)
    expect(mod.greet("test")).toMatchInlineSnapshot(`"hello test"`)
  })

  it("resolves path aliases with solution-style tsconfig", async () => {
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

    writeFileSync(
      join(testDir, "tsconfig.app.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
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

    writeFileSync(
      join(testDir, "src/lib/config.ts"),
      `export const appName = "my-app"`,
    )

    writeFileSync(
      join(testDir, "src/index.ts"),
      `export { appName } from "@/lib/config"`,
    )

    const mod = await bundleWithTsconfig(join(testDir, "src/index.ts"))
    expect(mod.appName).toMatchInlineSnapshot(`"my-app"`)
  })

  it("fails without tsconfig resolution for path aliases", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.app.json" }],
      }),
    )

    writeFileSync(
      join(testDir, "tsconfig.app.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      }),
    )

    writeFileSync(
      join(testDir, "src/lib/config.ts"),
      `export const appName = "my-app"`,
    )

    writeFileSync(
      join(testDir, "src/index.ts"),
      `import { appName } from "@/lib/config"\nexport default appName`,
    )

    await expect(
      build({
        platform: "node",
        format: "cjs",
        absWorkingDir: testDir,
        entryPoints: [join(testDir, "src/index.ts")],
        outfile: "out.js",
        write: false,
        bundle: true,
      }),
    ).rejects.toThrow()
  })

  it("works with explicit --tsconfig flag", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.app.json" }],
      }),
    )

    writeFileSync(
      join(testDir, "tsconfig.app.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      }),
    )

    writeFileSync(
      join(testDir, "src/utils/helper.ts"),
      `export const add = (a: number, b: number) => a + b`,
    )

    writeFileSync(
      join(testDir, "src/index.ts"),
      `export { add } from "@/utils/helper"`,
    )

    const mod = await bundleWithTsconfig(
      join(testDir, "src/index.ts"),
      join(testDir, "tsconfig.app.json"),
    )
    expect(mod.add(3, 4)).toMatchInlineSnapshot(`7`)
  })

  it("resolves paths inherited via extends in a referenced config", async () => {
    // solution-style root
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        files: [],
        references: [{ path: "./tsconfig.app.json" }],
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

    // app config extends base
    writeFileSync(
      join(testDir, "tsconfig.app.json"),
      JSON.stringify({
        extends: "./tsconfig.base.json",
        include: ["src"],
      }),
    )

    writeFileSync(
      join(testDir, "src/lib/config.ts"),
      `export const version = "1.2.3"`,
    )

    writeFileSync(
      join(testDir, "src/index.ts"),
      `export { version } from "@/lib/config"`,
    )

    const mod = await bundleWithTsconfig(join(testDir, "src/index.ts"))
    expect(mod.version).toMatchInlineSnapshot(`"1.2.3"`)
  })

  it("resolves aliases from deeply nested source file", async () => {
    writeFileSync(
      join(testDir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
      }),
    )

    const deepDir = join(testDir, "src/features/auth/components")
    mkdirSync(deepDir, { recursive: true })

    writeFileSync(
      join(testDir, "src/lib/constants.ts"),
      `export const APP = "chakra"`,
    )

    writeFileSync(
      join(deepDir, "login.ts"),
      `export { APP } from "@/lib/constants"`,
    )

    const mod = await bundleWithTsconfig(join(deepDir, "login.ts"))
    expect(mod.APP).toMatchInlineSnapshot(`"chakra"`)
  })
})
