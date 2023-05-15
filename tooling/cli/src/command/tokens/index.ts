import { writeFileSync } from "fs-extra"
import ora from "ora"
import { themeKeyConfiguration } from "./config"
import {
  TypingsTemplate,
  createThemeTypingsInterface,
} from "./create-theme-typings-interface"
import {
  resolveOutputPath,
  themeInterfaceDestination,
} from "./resolve-output-path"

export async function generateThemeTypings({
  theme,
  out,
  strictComponentTypes,
  format,
  strictTokenTypes,
  template,
  onError,
}: {
  theme: Record<string, any>
  out?: string
  strictComponentTypes?: boolean
  format?: boolean
  strictTokenTypes?: boolean
  template?: TypingsTemplate
  onError?: () => void
}) {
  const spinner = ora("Generating Theme Typings").start()

  try {
    const start = process.hrtime.bigint()

    const typings = await createThemeTypingsInterface(theme, {
      config: themeKeyConfiguration,
      strictComponentTypes,
      format,
      strictTokenTypes,
      template,
    })

    const outPath = await resolveOutputPath(out)

    spinner.info()
    spinner.text = `Write file "${outPath}"...`

    writeFileSync(outPath, typings, "utf8")

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    spinner.succeed(`Done in ${duration}s`)
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
