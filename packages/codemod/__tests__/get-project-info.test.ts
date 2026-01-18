import fs from "fs"
import path from "path"
import { describe, expect, it, vi } from "vitest"
import { getProjectInfo } from "../src/utils/get-project-info"

vi.mock("fs", async () => {
  return {
    default: {
      readdirSync: vi.fn(),
      readFileSync: vi.fn(),
      existsSync: vi.fn(),
    },
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  }
})

describe("getProjectInfo", () => {
  it("should detect Next.js project with src directory", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["next.config.js"] as any)
    vi.mocked(fs.existsSync).mockReturnValue(true) // src exists

    const info = getProjectInfo("/test/cwd")
    expect(info.framework).toBe("next")
    expect(info.componentsDir).toBe("src/components/ui")
  })

  it("should detect Next.js project without src directory", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["next.config.js"] as any)
    vi.mocked(fs.existsSync).mockReturnValue(false) // src does not exist

    const info = getProjectInfo("/test/cwd")
    expect(info.framework).toBe("next")
    expect(info.componentsDir).toBe("components/ui")
  })

  it("should detect Remix project", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["vite.config.ts"] as any)
    vi.mocked(fs.readFileSync).mockReturnValue(
      'import { vitePlugin as remix } from "@remix-run/dev";',
    )

    const info = getProjectInfo("/test/cwd")
    expect(info.framework).toBe("remix")
    expect(info.componentsDir).toBe("app/components/ui")
  })

  it("should detect Vite project", () => {
    vi.mocked(fs.readdirSync).mockReturnValue(["vite.config.ts"] as any)
    vi.mocked(fs.readFileSync).mockReturnValue(
      'import { defineConfig } from "vite";',
    )

    const info = getProjectInfo("/test/cwd")
    expect(info.framework).toBe("vite")
    expect(info.componentsDir).toBe("src/components/ui")
  })

  it("should default to Next.js structure if no config found", () => {
    vi.mocked(fs.readdirSync).mockReturnValue([] as any)

    const info = getProjectInfo("/test/cwd")
    expect(info.framework).toBe("next") // Default
    expect(info.componentsDir).toBe("src/components/ui")
  })
})
