import { promisify } from "util"
import { writeFile } from "fs"
import { exec } from "child_process"
import path from "path"
import ora from "ora"
import {
  resolveOutputPath,
  themeInterfaceDestination,
} from "./resolve-output-path"

const writeFileAsync = promisify(writeFile)
const execAsync = promisify(exec)

async function runTemplateWorker({ themeFile }: { themeFile: string }) {
  const { stdout, stderr } = await execAsync(
    `node ${path.join(
      __dirname,
      "..",
      "..",
      "scripts",
      "read-theme-file.worker.js",
    )} ${themeFile}`,
    {
      cwd: process.cwd(),
    },
  )

  if (stderr) {
    throw new Error(String(stderr))
  }

  return String(stdout)
}

export async function generateThemeTypings({
  themeFile,
  out,
}: {
  themeFile: string
  out: string
}) {
  const spinner = ora("Generating chakra theme typings").start()
  try {
    const template = await runTemplateWorker({ themeFile })
    const outPath = await resolveOutputPath(out)

    spinner.info()
    spinner.text = `Write file "${outPath}"...`

    await writeFileAsync(outPath, template, "utf8")
    spinner.succeed("Done")
  } catch (e) {
    spinner.fail("An error occurred")
    console.error(e.message)
  } finally {
    spinner.stop()
  }
}

export { themeInterfaceDestination }
