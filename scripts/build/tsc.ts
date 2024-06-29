import { cpSync } from "node:fs"
import { join } from "node:path/posix"

export async function generateTypes(dir: string) {
  const { execa } = await import("execa")

  await execa("pnpm", ["tsc", "--project", "tsconfig.build.json"], {
    cwd: dir,
    stdio: "inherit",
  })

  try {
    cpSync(
      join(dir, "dist", "types", "index.d.ts"),
      join(dir, "dist", "types", "index.d.mts"),
    )
  } catch {
    console.log("No .dts file found")
  }
}
