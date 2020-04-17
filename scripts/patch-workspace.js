import fs from "fs-utils"
import shell from "shelljs"
import inquirer from "listr-inquirer"
import editJson from "edit-json-file"
import Listr from "listr"
import chalk from "chalk"
import {
  editPackageJson,
  deletePackageJson,
  getPackageJson,
} from "./utils/package-json"
import getPackageInfo from "./utils/get-package-info"

function setupJestConfig(options) {
  const jestConfigExists = fs.exists(options.dir, "jest.config.js")

  if (!jestConfigExists) {
    shell.exec(`${options.cmd} ts-jest config:init`)
  }
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

function updateDevDependies(options) {
  const pkgJson = getPackageJson(options.dir)
  const devDeps = pkgJson.get("devDependencies")

  if (!!devDeps) {
    console.log(devDeps)
  } else {
    // bail-out
    return
  }

  return inquirer(
    [
      {
        name: "deleteDevDeps",
        type: "confirm",
        message: "Remove all devDependencies?",
      },
    ],
    ({ deleteDevDeps }) => {
      if (deleteDevDeps) {
        deletePackageJson(options.dir, "devDependencies")
      } else {
        inquirer(
          [
            {
              name: "selectedDevDeps",
              type: "checkbox",
              message: "Select dependencies to install",
              choices: Object.keys(devDeps),
            },
          ],
          ({ selectedDevDeps }) => {
            selectedDevDeps.forEach(key => {
              deletePackageJson(dir, `devDependencies.${key}`)
            })
          },
        )
      }
    },
  )
}

function updateTSConfig(options) {
  const tsConfigPath = fs.resolve(options.dir, "tsconfig.json")
  const tsConfig = editJson(tsConfigPath)
  tsConfig.set("extends", "../../tsconfig.json")
  tsConfig.save()
}

function bootstrap(options) {
  shell.exec("yarn bootstrap")
  const commands = ["lint", "build"]
  commands.forEach(script => {
    shell.exec(`${options.cmd} ${script}`)
  })
}

async function builder(options) {
  const tasks = new Listr([
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
      task: () => updateDevDependies(options),
    },
    {
      title: "update ts config",
      task: () => updateTSConfig(options),
    },
    {
      title: "bootstrap and run commands",
      task: () => bootstrap(options),
    },
  ])

  await tasks.run()

  console.log("%s Project ready", chalk.green.bold("DONE"))
  return true
}

async function run(args) {
  const pkg = args.slice(2)[0]
  const options = getPackageInfo(pkg)
  await builder(options)
}

run(process.argv)
