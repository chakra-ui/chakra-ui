import { spawn } from "child_process"

const args = process.argv.slice(2)
const pkg = args[0]

// get all flags
const flags = args.filter((flag) => flag.startsWith("--"))
const cmd = ["eslint", `packages/${pkg}`, "--ext", ".js,.ts,.tsx"].concat(flags)

console.log(`running lint command for package/${pkg}...`)

spawn(`yarn`, cmd, { stdio: "inherit" })
