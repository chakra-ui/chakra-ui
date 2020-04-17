import fs from "fs-utils"
import shell from "shelljs"
import inquirer from "inquirer"
import editJson from "edit-json-file"
import prettier from "prettier"
import chalk from "chalk"
import {
  editPackageJson,
  deletePackageJson,
  getPackageJson,
} from "./utils/package-json"
import getPackageInfo from "./utils/get-package-info"

async function setupJestConfig(options) {
  const path = fs.resolve(options.dir, "jest.config.js")
  const jestConfig = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
    transform: {
      ".(ts|tsx)$": "ts-jest/dist",
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  }

  const content = `module.exports = ${JSON.stringify(jestConfig)}`
  const formatted = prettier.format(content, { semi: false, parser: "babel" })

  fs.writeFileSync(path, formatted)
}

function updateEntryPoints(options) {
  const entryPoints = {
    main: "dist/cjs",
    module: "dist/esm",
    types: "dist/types",
  }

  editPackageJson(options.dir, entryPoints)
}

function updateScripts(options) {
  const scripts = {
    prebuild: "rimraf dist",
    start: "nodemon --exec yarn build --watch src",
    "build:esm": "tsc --module esnext --outDir dist/esm --declaration false",
    "build:cjs": "tsc --module commonjs --outDir dist/cjs --declaration false",
    "build:types":
      "tsc --emitDeclarationOnly --declaration true --declarationDir dist/types",
    build: "concurrently yarn:build:*",
    test: "jest --env=jsdom --passWithNoTests",
    "test:cov": "yarn test --coverage",
    "lint:src": "eslint src --ext .ts,.tsx --config ../../.eslintrc",
    "lint:types": "tsc --noEmit",
    lint: "concurrently yarn:lint:*",
  }

  editPackageJson(options.dir, scripts, `scripts`)
}

async function updateDevDependies(options) {
  const pkgJson = getPackageJson(options.dir)
  const devDeps = pkgJson.get("devDependencies")

  if (!!devDeps) {
    console.log(devDeps)
  } else {
    // bail-out
    return
  }

  const { deleteDevDeps } = await inquirer.prompt([
    {
      name: "deleteDevDeps",
      type: "confirm",
      message: "Remove all devDependencies?",
    },
  ])

  if (deleteDevDeps) {
    deletePackageJson(options.dir, "devDependencies")
  } else {
    const { selectedDevDeps } = await inquirer.prompt([
      {
        name: "selectedDevDeps",
        type: "checkbox",
        message: "Select devDependencies to remove",
        choices: Object.keys(devDeps),
      },
    ])

    selectedDevDeps.forEach(key => {
      deletePackageJson(dir, `devDependencies.${key}`)
    })
  }
}

function updateTSConfig(options) {
  const tsConfigPath = fs.resolve(options.dir, "tsconfig.json")
  const tsConfig = editJson(tsConfigPath)
  tsConfig.set("extends", "../../tsconfig.json")
  tsConfig.save()
}

function bootstrap(options) {
  shell.exec("yarn bootstrap")
  const commands = ["lint", "build", "test"]
  commands.forEach(script => {
    shell.exec(`${options.cmd} ${script}`)
  })
}

async function builder(options) {
  const tasks = [
    {
      title: "Setup jest config",
      task: () => setupJestConfig(options),
    },
    {
      title: "Update entry points in package.json",
      task: () => updateEntryPoints(options),
    },
    {
      title: "Update scripts in package.json",
      task: () => updateScripts(options),
    },
    {
      title: "Update devDependencies in package.json",
      task: async () => await updateDevDependies(options),
    },
    {
      title: "update ts config",
      task: () => updateTSConfig(options),
    },
    {
      title: "bootstrap and run commands",
      task: () => bootstrap(options),
    },
  ]

  for (const item of tasks) {
    const { title, task } = item
    chalk.green(title)
    await task()
  }

  console.log("%s Project ready", chalk.green.bold("DONE"))
  return true
}

async function run(args) {
  const pkg = args.slice(2)[0]
  const options = getPackageInfo(pkg)
  await builder(options)
}

run(process.argv)
