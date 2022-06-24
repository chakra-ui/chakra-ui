import { promisify } from "util"
import { writeFile } from "fs"
import { fork, Serializable } from "child_process"
import path from "path"
import ora from "ora"
import {
  resolveOutputPath,
  themeInterfaceDestination,
} from "./resolve-output-path"

type ErrorRecord = Record<"err", string>

const writeFileAsync = promisify(writeFile)

async function runTemplateWorker({
  themeFile,
  strictComponentTypes,
  format,
}: {
  themeFile: string
  strictComponentTypes?: boolean
  format?: boolean
}): Promise<string> {
  const worker = fork(
    path.join(__dirname, "..", "..", "scripts", "read-theme-file.worker.js"),
    [themeFile]
      .concat(strictComponentTypes ? "--strict-component-types" : [])
      .concat(format ? "--format" : []),
    {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      cwd: process.cwd(),
    },
  )

  return new Promise((resolve, reject) => {
    worker.on("message", (message: ErrorRecord | Serializable) => {
      const errMessage = (message as ErrorRecord)?.err

      if (errMessage) {
        reject(new Error(errMessage))
      }

      return resolve(String(message))
    })
    worker.on("error", reject)
  })
}

export async function generateThemeTypings({
  themeFile,
  out,
  strictComponentTypes,
  format,
  onError,
}: {
  themeFile: string
  out?: string
  strictComponentTypes?: boolean
  format?: boolean
  onError?: () => void
}) {
  const spinner = ora("Generating chakra theme typings").start()
  try {
    const template = await runTemplateWorker({
      themeFile,
      strictComponentTypes,
      format,
    })
    const outPath = await resolveOutputPath(out)

    spinner.info()
    spinner.text = `Write file "${outPath}"...`

    await writeFileAsync(outPath, template, "utf8")
    spinner.succeed("Done")
  } catch (e) {
    spinner.fail("An error occurred")
    if (e instanceof Error) {
      console.error(e.message)
    }
    spinner.stop()
    onError?.()
  } finally {
    spinner.stop()
  }
}

export { themeInterfaceDestination }
