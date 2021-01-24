import "regenerator-runtime/runtime"
import * as path from "path"
import { writeFile } from "fs"
import { promisify } from "util"
import { exec } from "child_process"
import { program } from "commander"
import ora from "ora"
import { destination, resolveOutputPath } from "./resolve-output-path"
import { initCLI } from "./init-cli"

const writeFileAsync = promisify(writeFile)
const execAsync = promisify(exec)

async function runTemplateWorker({ themeFile }: { themeFile: string }) {
  const { stdout, stderr } = await execAsync(
    `node ${path.join(__dirname, "create-template-worker.js")} ${themeFile}`,
    {
      cwd: process.cwd(),
    },
  )

  if (stderr) {
    throw new Error(String(stderr))
  }

  return String(stdout)
}

async function generateThemeTypings({
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

export async function run() {
  initCLI()

  program
    .command("tokens <source>")
    .option("--out <path>", `output file e.g. ${path.join(...destination)}`)
    .action(async (themeFile: string, commander: any) => {
      const { out } = commander.opts()
      await generateThemeTypings({ themeFile, out })
    })

  program.on("--help", () => {
    console.info(`Example call:
  $ chakra-cli tokens theme.ts
`)
  })

  program.parse()
}
