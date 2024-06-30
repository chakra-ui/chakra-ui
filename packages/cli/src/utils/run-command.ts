import { parseNi, run } from "@antfu/ni"

export function runCommand(cmd: string[], cwd?: string) {
  return run(parseNi, cmd, { cwd, programmatic: true })
}
