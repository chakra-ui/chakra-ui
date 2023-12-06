import { buildPackages } from "./build.js"

const flags = process.argv.slice(2)

const watch = flags.includes("--watch")
const clean = flags.includes("--clean")
const dts = flags.includes("--dts")

buildPackages({ watch, clean, dts })
