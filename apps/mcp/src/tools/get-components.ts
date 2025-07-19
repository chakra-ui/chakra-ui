import type { Tool } from "../lib/types.js"

export const getComponentsTool: Tool<{ componentList: string[] }> = {
  name: "get_components",
  description:
    "Get a list of Chakra UI components. This tool retrieves the names of all available Chakra UI components.",
  async ctx() {
    const componentsData = await fetch("https://chakra-ui.com/types/index.json")

    if (!componentsData.ok) {
      throw new Error("Failed to fetch components")
    }

    const componentList = (await componentsData.json()) as string[]

    return { componentList }
  },
  exec(server, { ctx, name, description }) {
    server.tool(name, description, {}, async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(ctx.componentList, null, 2),
          },
        ],
      }
    })
  },
}
