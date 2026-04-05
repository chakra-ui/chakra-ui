import * as p from "@clack/prompts"
import { Command } from "commander"
import createDebug from "debug"
import {
  fetchComponentExample,
  fetchComponentList,
  fetchComponentProps,
} from "../utils/fetch"
import { formatCliError } from "../utils/format-error"

const debug = createDebug("chakra:component")

export const ComponentCommand = new Command("component")
  .description("Explore Chakra UI components")

  .addCommand(
    new Command("list")
      .description("List all available components")
      .option("--charts", "Include chart components")
      .action(async (flags: { charts?: boolean }) => {
        const { default: Table } = await import("cli-table")

        const data = await fetchComponentList()
        debug("component list", data)

        const components = data.components
        const charts = data.charts

        const table = new Table({
          head: ["name"],
          colWidths: [30],
          style: { compact: true },
        })

        for (const name of components) {
          table.push([name])
        }

        p.log.info(`Components (${components.length})`)
        p.log.info(table.toString())

        if (flags.charts) {
          const chartTable = new Table({
            head: ["name"],
            colWidths: [30],
            style: { compact: true },
          })

          for (const name of charts) {
            chartTable.push([name])
          }

          p.log.info(`\nCharts (${charts.length})`)
          p.log.info(chartTable.toString())
        }

        p.outro("🎉 Done!")
      }),
  )

  .addCommand(
    new Command("props")
      .description("Show props for a component")
      .argument("<component>", "Component name")
      .action(async (component: string) => {
        debug("fetching props for", component)

        try {
          const json = await fetchComponentProps(component)
          p.log.info(`Props for <${component}>`)
          p.log.info(JSON.stringify(json, null, 2))
          p.outro("🎉 Done!")
        } catch (error) {
          p.log.error(formatCliError(error))
          process.exit(1)
        }
      }),
  )

  .addCommand(
    new Command("example")
      .description("Show usage examples for a component")
      .argument("<component>", "Component name")
      .action(async (component: string) => {
        debug("fetching example for", component)

        try {
          const json = await fetchComponentExample(component)
          p.log.info(`Examples for <${component}>`)
          p.log.info(JSON.stringify(json, null, 2))
          p.outro("🎉 Done!")
        } catch (error) {
          p.log.error(formatCliError(error))
          process.exit(1)
        }
      }),
  )
