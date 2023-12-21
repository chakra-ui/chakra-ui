import { findPackages } from "find-packages"
import { writeFile } from "node:fs/promises"

async function main() {
  const pkgs = await findPackages("hooks")
  await Promise.all(
    pkgs.map(async (pkg) => {
      const data = {
        extends: "../../../tsconfig.json",
        include: ["src", "index.ts"],
      }

      return writeFile(
        `${pkg.dir}/tsconfig.json`,
        JSON.stringify(data, null, 2),
      )
    }),
  )
}

main()
