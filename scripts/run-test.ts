import { spawn } from "child_process"

const cwd = process.cwd()
const args = process.argv.slice(2)
const pkg = args[0]

// get all flags
const flags = args.filter((flag) => flag.startsWith("--"))
const cmd = ["test", `${cwd}/packages/${pkg}`].concat(flags)
spawn(`yarn`, cmd, { stdio: "inherit" })
