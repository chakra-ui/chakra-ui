import * as p from "@clack/prompts"
import { Command } from "commander"

export const CompositionCommand = new Command("composition")
  .addCommand(
    new Command("add")
      .description("Add a new composition for better DX")
      .argument("[components...]", "components to add")
      .action(async (components: string[]) => {
        console.log("Adding components", components)
        p.outro("🎉 Done!")
      }),
  )
  .addCommand(
    new Command("list").description("List all compositions").action(() => {
      console.log("Listing compositions")
      p.outro("🎉 Done!")
    }),
  )
