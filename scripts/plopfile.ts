import nodePlop, { ActionType } from "node-plop"
import { spawn } from "child_process"

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const camelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}

const workspaces = [
  "packages",
  "packages/@chakra-utils",
  "packages/@chakra-machines",
  "packages/@chakra-hooks",
] as const

type Workspace = typeof workspaces[number]

interface Answers {
  componentName: string
  description: string
  outDir: Workspace
}

async function createPackage() {
  const plop = await nodePlop("plop-templates/plopfile.hbs")

  plop.setHelper("capitalize", (text) => {
    return capitalize(camelCase(text))
  })

  plop.setGenerator("component", {
    description: "Generates a component package",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "Enter component name:",
      },
      {
        type: "input",
        name: "description",
        message: "The description of this component:",
      },
      {
        type: "list",
        name: "outDir",
        message: "where should this component or package live?",
        default: "packages",
        choices: workspaces,
      },
    ],
    actions(answers: any) {
      const actions: ActionType[] = []

      if (!answers) return actions

      const { componentName, description, outDir } = answers as Answers

      actions.push({
        type: "addMany",
        templateFiles: "component/**",
        destination: `../${outDir}/{{dashCase componentName}}`,
        base: "component/",
        data: { description, componentName },
        abortOnFail: true,
      })

      return actions
    },
  })

  const { runPrompts, runActions } = plop.getGenerator("component")

  const answers = await runPrompts()
  await runActions(answers)
}

async function run() {
  await createPackage()
  spawn("pnpm", ["install"], { stdio: "inherit" })
}

run()
