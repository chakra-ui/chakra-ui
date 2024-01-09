import { Project } from "find-packages"
import { readdirSync } from "fs"
import { join } from "node:path/posix"

function removeExt(path: string) {
  return path.replace(/\.[^.]+$/, "")
}

// exclude files with .stories.tsx?, .test.tsx?, .fixture.tsx?
const excludeFileRegex = /\.(stories|test|fixture|types|utils)\.[^.]+$/

// exclude in shared or utils folder
const excludeDirRegex = /^(shared|utils)$/

type Entry = [string, string]

export function getProjectEntries(project: Project): Entry[] {
  const result = readdirSync(join(project.dir, "src"), {
    withFileTypes: true,
    encoding: "utf-8",
  })
    .filter(
      (dirent) =>
        !excludeFileRegex.test(dirent.name) &&
        !excludeDirRegex.test(dirent.name),
    )
    .map((dirent) => {
      if (dirent.isFile()) {
        const rawFile = removeExt(dirent.name)
        return [
          rawFile === "index" ? "." : `./${rawFile}`,
          `./${join(".", "src", dirent.name)}`,
        ]
      }

      if (dirent.isDirectory()) {
        const rawDir = dirent.name
        return [`./${rawDir}`, `./${join("src", dirent.name, "index.ts")}`]
      }
    }) as Entry[]

  return result.sort((a, b) => a[0].localeCompare(b[0]))
}
