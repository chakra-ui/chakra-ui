import { execSync } from "child_process"

export async function isGitClean() {
  try {
    const output = execSync("git status --porcelain", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    })
    return output.trim() === ""
  } catch (error) {
    return true
  }
}

export function isGitRepo() {
  try {
    execSync("git rev-parse --git-dir", {
      stdio: "ignore",
    })
    return true
  } catch (error) {
    return false
  }
}
