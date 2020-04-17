import fs from "fs-utils"
import shell from "shelljs"
import inquirer from "inquirer"
import {
  editPackageJson,
  deletePackageJson,
  getPackageJson,
} from "./utils/package-json"
import getPackageInfo from "./utils/get-package-info"

function setupJestConfig(dir) {
  // setup jest config
  const jestConfigExists = fs.exists(dir, "jest.config.js")

  if (!jestConfigExists) {
    shell.exec(`${cmd} ts-jest config:init`)
  }
}

function updateEntryPoints(dir) {
  // edit entry points
  const entryPoints = {
    main: "dist/cjs",
    module: "dist/esm",
    types: "dist/types",
  }

  editPackageJson(dir, entryPoints)
}

function updateScripts(dir) {
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

  editPackageJson(dir, scripts, `scripts`)
}

async function updateDevDependies(dir) {
  const pkgJson = getPackageJson(dir)
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
    deletePackageJson(dir, "devDependencies")
  } else {
    const { selectedDevDeps } = inquirer.prompt([
      {
        name: "selectedDevDeps",
        type: "checkbox",
        message: "Select dependencies to install",
        choices: Object.keys(devDeps),
      },
    ])

    selectedDevDeps.forEach(key => {
      deletePackageJson(dir, `devDependencies.${key}`)
    })
  }
}

function updateTSConfig(dir) {
  // update the tsConfig
  const tsConfigPath = fs.resolve(dir, "package.json")
  const tsConfig = editJson(tsConfigPath)
  tsConfig.set("extends", "../../tsconfig.json")
  tsConfig.save()
}

function bootstrap() {
  shell.exec("yarn bootstrap")
  const commands = ["lint", "test", "build", "test"]
  commands.forEach(script => {
    shell.exec(`${cmd} ${script}`)
  })
}

async function builder(options) {
  const tasks = new Listr([
    {
      title: "Setup jest config",
      task: () => setupJestConfig(options.dir),
    },
    {
      title: "Update entry points in package.json",
      task: () => updateEntryPoints(options.dir),
    },
    {
      title: "Update scripts in package.json",
      task: () => updateScripts(options.dir),
    },
    {
      title: "Update devDependencies in package.json",
      task: () => updateDevDependies(options.dir),
    },
    {
      title: "update ts config",
      task: () => updateTSConfig(options.dir),
    },
    {
      title: "bootstrap and run commands",
      task: () => bootstrap(),
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
