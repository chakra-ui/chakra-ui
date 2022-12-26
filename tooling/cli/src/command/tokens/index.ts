import { promisify } from "util"
import { writeFile } from "fs"
import { fork, Serializable } from "child_process"
import path from "path"
import ora from "ora"
import {
  resolveOutputPath,
  themeInterfaceDestination,
} from "./resolve-output-path"
import { TypingsTemplate } from "./create-theme-typings-interface"

type ErrorRecord = Record<"err", string>

const writeFileAsync = promisify(writeFile)

async function runTemplateWorker({
  themeFile,
  strictComponentTypes,
  format,
  strictTokenTypes,
  template,
}: {
  themeFile: string
  strictComponentTypes?: boolean
  format?: boolean
  strictTokenTypes?: boolean
  template?: TypingsTemplate
}): Promise<string> {
  const worker = fork(
    path.join(__dirname, "..", "..", "scripts", "read-theme-file.worker.js"),
    [themeFile]
      .concat(strictComponentTypes ? "--strict-component-types" : [])
      .concat(format ? "--format" : [])
      .concat(strictTokenTypes ? "--strict-token-types" : [])
      .concat(template ? `--template=${template}` : []),
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
  strictTokenTypes,
  template,
  onError,
}: {
  themeFile: string
  out?: string
  strictComponentTypes?: boolean
  format?: boolean
  strictTokenTypes?: boolean
  template?: TypingsTemplate
  onError?: () => void
}) {
  const spinner = ora("Generating chakra theme typings").start()
  try {
    const themeTypings = await runTemplateWorker({
      themeFile,
      strictComponentTypes,
      format,
      strictTokenTypes,
      template,
    })
    const outPath = await resolveOutputPath(out)

    spinner.info()
    spinner.text = `Write file "${outPath}"...`

    await writeFileAsync(outPath, themeTypings, "utf8")
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
