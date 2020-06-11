import fs from "fs-utils"
import shell from "shelljs"
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
    collectCoverageFrom: ["tests/**/*.{ts,tsx,js,jsx}"],
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
    "build:esm":
      "BABEL_ENV=esm babel src --root-mode upward --extensions .ts,.tsx -d dist/esm --source-maps",
    "build:cjs":
      "BABEL_ENV=esm babel src --root-mode upward --extensions .ts,.tsx -d dist/cjs --source-maps",
    "build:types":
      "tsc --emitDeclarationOnly --declaration --declarationMap --declarationDir dist/types",
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
    {
      title: "delete node_modules",
      task: () => deleteNodeModule(options),
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
