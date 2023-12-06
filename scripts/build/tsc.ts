import { Project } from "find-packages"
import { copyFileSync } from "fs-extra"
import { join } from "node:path/posix"

export async function generateTypes(project: Project) {
  const { dir } = project

  const { execa } = await import("execa")

  await execa("pnpm", ["tsc", "--project", "tsconfig.build.json"], {
    cwd: dir,
    stdio: "inherit",
  })

  copyFileSync(
    join(dir, "dist", "types", "index.d.ts"),
    join(dir, "dist", "types", "index.d.mts"),
  )
}
