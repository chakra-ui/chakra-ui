import fs from "fs/promises"

const getEntrypoints = async () => {
  const packageJson = JSON.parse(
    await fs.readFile("package.json", { encoding: "utf-8" }),
  )
  const entrypoints = packageJson.tsup.entry
    .slice(1)
    .map((ep: string) => ep.replace("src/", "dist/").replace(".ts", ""))

  return entrypoints
}

export default async function main() {
  const entrypoints = await getEntrypoints()

  await Promise.all(
    entrypoints.map(async (entrypoint: string) => {
      const category = entrypoint.split("/")[1]
      const file = entrypoint.split("/")[2].replace(/^index$/gm, "")

      const mjs = `${entrypoint}.mjs`
      const cjs = `${entrypoint}.js`
      const dts = `${entrypoint}.d.ts`

      await fs.mkdir(
        `${entrypoint.replace("dist/", "").replace("/index", "")}/dist`,
        {
          recursive: true,
        },
      )

      await Promise.all([
        fs.copyFile(mjs, `${category}/${file}/dist/index.mjs`),
        fs.copyFile(cjs, `${category}/${file}/dist/index.js`),
        fs.copyFile(dts, `${category}/${file}/dist/index.d.ts`),
      ])
    }),
  )
}

main()
