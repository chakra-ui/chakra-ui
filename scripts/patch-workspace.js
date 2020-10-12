import chalk from "chalk"
import editJson from "edit-json-file"
import fs from "fs-utils"
import prettier from "prettier"
import shell from "shelljs"

import getPackageInfo from "./utils/get-package-info"
import {
  editPackageJson,
  deletePackageJson,
  getPackageJson,
} from "./utils/package-json"

async function setupJestConfig(options) {
  const path = fs.resolve(options.dir, "jest.config.js")
  const jestConfig = {
    collectCoverageFrom: ["tests/**/*.{ts,tsx,js,jsx}"],
    preset: "ts-jest",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testEnvironment: "node",
    transform: {
      ".(ts|tsx)$": "ts-jest/dist",
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  }

  const content = `module.exports = ${JSON.stringify(jestConfig)}`
  const formatted = prettier.format(content, { parser: "babel", semi: false })

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
    build: "concurrently yarn:build:*",
    "build:cjs":
      "cross-env BABEL_ENV=esm babel src --root-mode upward --extensions .ts,.tsx -d dist/cjs --source-maps",
    "build:esm":
      "cross-env BABEL_ENV=esm babel src --root-mode upward --extensions .ts,.tsx -d dist/esm --source-maps",
    "build:types":
      "tsc --emitDeclarationOnly --declaration --declarationDir dist/types",
    lint: "concurrently yarn:lint:*",
    "lint:src": "eslint src --ext .ts,.tsx --config ../../.eslintrc.js",
    "lint:types": "tsc --noEmit",
    prebuild: "rimraf dist",
    start: "nodemon --exec yarn build --watch src",
    test: "jest --env=jsdom --passWithNoTests",
    "test:cov": "yarn test --coverage",
  }

  editPackageJson(options.dir, scripts, `scripts`)
}

function updateDevDependies(options) {
  const pkgJson = getPackageJson(options.dir)
  const devDeps = pkgJson.get("devDependencies")

  if (devDeps) {
    console.log(devDeps)
  } else {
    // bail-out
    return
  }

  deletePackageJson(options.dir, "devDependencies")
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
  commands.forEach((script) => {
    shell.exec(`${options.cmd} ${script}`)
  })
}

function deleteNodeModule(options) {
  const path = fs.resolve(options.dir, "node_modules")
  shell.rm("-rf", path)
}

async function builder(options) {
  const tasks = [
    {
      task: () => setupJestConfig(options),
      title: "Setup jest config",
    },
    {
      task: () => updateEntryPoints(options),
      title: "Update entry points in package.json",
    },
    {
      task: () => updateScripts(options),
      title: "Update scripts in package.json",
    },
    {
      task: async () => await updateDevDependies(options),
      title: "Update devDependencies in package.json",
    },
    {
      task: () => updateTSConfig(options),
      title: "update ts config",
    },
    {
      task: () => bootstrap(options),
      title: "bootstrap and run commands",
    },
    {
      task: () => deleteNodeModule(options),
      title: "delete node_modules",
    },
  ]

  for (const item of tasks) {
    const { title, task } = item
    await task()
    console.log(`%s ${title}`, chalk.green.bold("DONE"))
  }

  console.log("%s All done!", chalk.green.bold("DONE"))
  return true
}

async function run(args) {
  const pkg = args.slice(2)[0]
  const options = getPackageInfo(pkg)
  await builder(options)
}

run(process.argv)
