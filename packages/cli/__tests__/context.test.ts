import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { getProjectContext } from "../src/utils/context"

describe("getProjectContext", () => {
  let testDir: string
  let startDir: string

  beforeEach(() => {
    startDir = process.cwd()
    testDir = mkdtempSync(join(tmpdir(), "chakra-cli-context-test-"))
    // the vite config is read by the path relative to the project root
    process.chdir(testDir)
  })

  afterEach(() => {
    process.chdir(startDir)
    rmSync(testDir, { recursive: true, force: true })
  })

  const write = (file: string, content = "") => {
    writeFileSync(join(testDir, file), content)
  }

  const getScope = async () =>
    (await getProjectContext({ cwd: testDir, tsx: true })).scope

  it("detects a next project", async () => {
    write("next.config.mjs")
    expect(await getScope()).toEqual({
      framework: "next",
      componentsDir: join("components", "ui"),
    })
  })

  it("detects a next project with a src directory", async () => {
    write("next.config.ts")
    mkdirSync(join(testDir, "src"))
    expect(await getScope()).toEqual({
      framework: "next",
      componentsDir: join("src", "components", "ui"),
    })
  })

  it("detects a vite project", async () => {
    write("vite.config.ts", 'import { defineConfig } from "vite"\n')
    expect(await getScope()).toEqual({
      framework: "vite",
      componentsDir: join("src", "components", "ui"),
    })
  })

  it("detects a react router project from its vite config", async () => {
    write(
      "vite.config.ts",
      'import { reactRouter } from "@react-router/dev/vite"\n',
    )
    expect(await getScope()).toEqual({
      framework: "remix",
      componentsDir: join("app", "components", "ui"),
    })
  })

  it("reads vite.config.ts before vite.config.js", async () => {
    write("vite.config.js", 'import { defineConfig } from "vite"\n')
    write(
      "vite.config.ts",
      'import { reactRouter } from "@react-router/dev/vite"\n',
    )
    expect((await getScope()).framework).toBe("remix")
  })

  it("ignores directories and broken symlinks named like a config", async () => {
    mkdirSync(join(testDir, "vite.config.ts"))
    symlinkSync(join(testDir, "missing.js"), join(testDir, "next.config.js"))
    expect(await getScope()).toEqual({
      framework: "next",
      componentsDir: join("src", "components", "ui"),
    })
  })

  it("ignores configs below the project root", async () => {
    mkdirSync(join(testDir, "apps"))
    write(join("apps", "vite.config.ts"))
    expect(await getScope()).toEqual({
      framework: "next",
      componentsDir: join("src", "components", "ui"),
    })
  })
})
