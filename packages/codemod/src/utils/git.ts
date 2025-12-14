import { execSync } from "child_process"

export async function isGitClean(): Promise<boolean> {
  try {
    const output = execSync("git status --porcelain", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
    })
    return output.trim() === ""
  } catch (error) {
    // If git is not available or not a git repository, return true
    return true
  }
}

export function isGitRepo(): boolean {
  try {
    execSync("git rev-parse --git-dir", {
      stdio: "ignore",
    })
    return true
  } catch (error) {
    return false
  }
}
