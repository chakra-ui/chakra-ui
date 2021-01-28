import execa from "execa"
import path from "path"
import pkgDir from "pkg-dir"
import mkdirp from "mkdirp"

// configure paths
const rootPath = pkgDir.sync(__dirname)

if (!rootPath) {
  console.error("Root directory not found")
  process.exit(1)
}

const toolingPath = path.join(rootPath, "tooling")
const paths = {
  js: path.join(toolingPath, "cra-template"),
  ts: path.join(toolingPath, "cra-template-typescript"),
}

// output path is either the first input to the script (`/tmp` in `ts-node
// build-templates.ts /tmp`) or `rootPath` if no input provided
const outputPath = path.resolve(process.argv[2] || rootPath)

buildTemplates()

async function buildTemplates() {
  // make output dir if it doesn't already exist
  await mkdirp(outputPath)

  // can't run concurrently due to potential `yarn` issues. see
  // https://github.com/yarnpkg/yarn/issues/2629 for more info
  await buildTemplate("js")
  await buildTemplate("ts")
}

async function buildTemplate(type: "js" | "ts") {
  const templatePath = paths[type]
  const buildDir = `cra-template-${type}`
  const buildPath = path.join(outputPath, buildDir)

  try {
    console.log(`${type}: Generating project at ${buildPath}`)
    await execa(
      "yarn",
      ["create", "react-app", buildDir, "--template", `file:${templatePath}`],
      { cwd: outputPath },
    )

    console.log(`${type}: Building project`)
    await execa("yarn", ["build"], { cwd: buildPath })
  } catch (error) {
    // log the error message and then exit using the error from stderr
    console.error(`${type}: Template failed to build`)
    console.error(error.message)
    process.exit(error.errno || 1)
  }
}
