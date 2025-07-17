#!/usr/bin/env node
import { spawn } from "child_process"
import { existsSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, "..")
const serverPath = resolve(projectRoot, "dist/server.js")

// Check if server.js exists, if not, build it
if (!existsSync(serverPath)) {
  console.log("📦 Building server...")
  const buildProcess = spawn("npm", ["run", "build"], {
    cwd: projectRoot,
    stdio: "inherit",
  })

  buildProcess.on("close", (code) => {
    if (code !== 0) {
      console.error("❌ Build failed")
      process.exit(1)
    }
    startInspector()
  })
} else {
  startInspector()
}

function startInspector() {
  const absolutePath = resolve(projectRoot, "dist/server.js")

  console.log("\n🔍 Starting MCP Inspector...")
  console.log(
    `📋 Server command (copied to clipboard): \n Command: node \n Arguments: ${absolutePath}`,
  )
  console.log(
    '\n👉 In the inspector, select "Command" and paste the command above\n',
  )

  // Try to copy to clipboard (works on macOS and Linux)
  try {
    const copyProcess = spawn("pbcopy", [], { stdio: "pipe" })
    copyProcess.stdin.write(absolutePath)
    copyProcess.stdin.end()

    copyProcess.on("close", () => {
      console.log("✅ Arguments copied to clipboard!")
    })
  } catch (err) {
    // Fallback for systems without pbcopy
    console.log("💡 Copy the command manually from above")
  }

  // Start the inspector
  const inspectorProcess = spawn(
    "npx",
    ["-y", "@modelcontextprotocol/inspector"],
    {
      cwd: projectRoot,
      stdio: "inherit",
    },
  )

  inspectorProcess.on("close", (code) => {
    process.exit(code)
  })
}
