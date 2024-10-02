import { Project } from "find-packages"

export async function generateTypes(project: Project) {
  const { dir } = project

  const { execa } = await import("execa")

  await execa("pnpm", ["tsc", "--project", "tsconfig.build.json"], {
    cwd: dir,
    stdio: "inherit",
  })
}
