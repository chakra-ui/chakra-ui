import { getArkComponentFiles } from "@chakra-ui/docgen"
import consola from "consola"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"

async function main() {
  const files = await getArkComponentFiles({
    baseDir: "public/types/ark",
  })

  ensureDirSync("public/types/ark")

  const proms = files.map(async (file) => {
    const { path, content } = file

    await writeFile(path, JSON.stringify(content, null, 2))
  })

  await Promise.all(proms)

  consola.success("Done ✅")
}

main().catch((err) => {
  consola.error(err.message)
  process.exit(1)
})
