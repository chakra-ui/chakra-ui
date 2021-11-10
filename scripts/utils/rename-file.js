import shell from "shelljs"
import path from "path"

function toKebab(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase()
}

function renameFile(file) {
  const ext = path.extname(file)
  if (ext && ext !== ".md" && !file.includes("index")) {
    const renamed = file.split(".").map(toKebab).join(".")
    if (file === renamed) return
    shell.exec(`git mv --force ${file} ${renamed}`)
  }
}

export default renameFile
