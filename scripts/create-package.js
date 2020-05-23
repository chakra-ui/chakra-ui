/* eslint-disable @typescript-eslint/no-var-requires */

const arg = require("arg")
const inquirer = require("inquirer")
const chalk = require("chalk")
const editJsonFile = require("edit-json-file")
const fs = require("fs")
const Listr = require("listr")
const ncp = require("ncp")
const path = require("path")
const { promisify } = require("util")
const execa = require("execa")

const access = promisify(fs.access)
const copy = promisify(ncp)

function parseArgsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--no-hook": Boolean,
      "--file": Boolean,
      "--empty": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    },
  )

  const inlineArgs = args._

  return {
    noHook: args["--no-hook"] || false,
    asSingleFile: args["--file"] || false,
    noCopy: args["--empty"] || false,
    component: inlineArgs[0],
  }
}

async function promptForMissingOptions(options) {
  const questions = []
  if (!options.component) {
    questions.push({
      type: "input",
      name: "component",
      message: "What component would you like to create",
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    component: options.component || answers.component,
  }
}

async function copyTemplateFiles(options) {
  const templateDir = path.resolve(__dirname, "template")
  console.log(templateDir)

  options.templateDir = templateDir
  options.targetDir = `packages/${options.component}`

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch {
    console.error(`%s Invalid template name`, chalk.red.bold("ERROR"))
    process.exit(1)
  }

  return copy(options.templateDir, options.targetDir, {
    clobber: false,
  })
}

function createFile(filePath, fileContent = "") {
  fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      console.log(`Failed to create ${filePath}`, chalk.red.bold("ERROR"))
      throw error
    }
    console.log(`Create ${filePath}`, chalk.green.bold("DONE"))
  })
}

const hookContent = (component) => `
import * as React from "react"

interface ${component}Props{

}

export function use${component}(props: ${component}Props){
  return {
    ...props
  }
}

export default use${component}
`

const componentContent = (component) => `
import * as React from "react"
import { use${component}, ${component}Props }from "./${component}.hook"

export function ${component}(props: ${component}Props){
  const hook = use${component}(props)
  return <div>This is a ${component} component</div>
}

export default ${component}
`

const storiesContent = (component) => `
import * as React from "react"

export default {
  title: "${component}"
}

export const BasicExample = () =><div>Component goes here</div>
`

function createFiles(options) {
  const { component, noHook, asSingleFile } = options

  if (asSingleFile) {
    createFile(`${component}.tsx`, componentContent(component))
  } else {
    const files = [
      [`${component}.tsx`, componentContent],
      [`${component}.stories.tsx`, storiesContent],
      [`index.ts`],
    ]

    if (!noHook) {
      files.push([`${component}.hook.tsx`, hookContent])
    }

    const srcDirectory = `packages/${component}/src/`

    createDirectory(srcDirectory)

    files.forEach(([file, fileContent]) => {
      const filePath = srcDirectory + file
      createFile(
        filePath,
        typeof fileContent === "function"
          ? fileContent(component)
          : fileContent,
      )
    })
  }
}

// Create a new folder at the specified path
function createDirectory(path) {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
  } catch (err) {
    console.error(`[createDirectory]: Failed to create director at ${path}`)
  }
}

// Add index.ts file to the src/ folder
function appendToSrc(options) {
  const { component, noHook } = options
  let content = `export * from "./${component}";`

  if (!noHook) {
    content = content.concat(`\nexport * from  "./${component}.hook";`)
  }

  const path = getPath(component)

  fs.appendFile(`${path}/src/index.ts`, content, "utf8", (error) => {
    if (error) throw error
    console.log("Data is appended to file successfully.")
  })
}

function getPath(component) {
  return `packages/${component}`
}

function createPackageDir(options) {
  createDirectory(getPath(options.component))
}

// Edits the package.json of the component package
function editPackageJson(options) {
  const { component } = options
  const path = getPath(component)

  const package = component.toLowerCase()
  const file = editJsonFile(`${path}/package.json`)

  file.set("name", `@chakra-ui/${package}`)
  file.set("module", `dist/${package}.esm.js`)
  file.save()
}

// Adds workspace shortcut to package.json scripts
function editRootPackageJson(options) {
  const { component } = options
  const package = component.toLowerCase()
  const file = editJsonFile(`package.json`)

  file.set(`scripts.${package}`, `yarn workspace @chakra-ui/${package}`)
  file.save()
}

async function createPackage(options) {
  const tasks = new Listr([
    {
      title: "Create component package in packages/",
      task: () => createPackageDir(options),
    },
    { title: "Copy template files", task: () => copyTemplateFiles(options) },
    {
      title: "Add files to src",
      task: () => createFiles(options),
      skip: () => options.noCopy === true,
    },
    // {
    //   title: "Edit package.json",
    //   task: () => editPackageJson(options),
    // },
    {
      title: "Add export to src/index",
      task: () => appendToSrc(options),
      skip: () => options.noCopy === true,
    },
    {
      title: "Add shortcut to root package.json",
      task: () => editRootPackageJson(options),
    },
    {
      title: "Symlink all packages",
      task: async () => {
        const result = await execa("yarn", ["install"], {
          cwd: process.cwd(),
        })
        if (result.failed) {
          return Promise.reject(new Error("Failed to run yarn install"))
        }
      },
    },
  ])

  await tasks.run()

  console.log("%s Project ready", chalk.green.bold("DONE"))
  return true
}

async function run(args) {
  let options = parseArgsIntoOptions(args)
  options = await promptForMissingOptions(options)
  await createPackage(options)
}

run(process.argv)
