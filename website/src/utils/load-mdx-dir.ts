import path from "path"
import shell from "shelljs"
import { loadMdx } from "utils/load-mdx"

async function loadMdxDir(mdxDir: string) {
  const dir = path.join(process.cwd(), `pages/${mdxDir}`)
  const filenames = shell.ls("-R", `${dir}/**/*.mdx`)

  const dataPromise = filenames.map(async (filename) => loadMdx(filename))

  const data = await Promise.all(dataPromise)

  return data
}

export default loadMdxDir
