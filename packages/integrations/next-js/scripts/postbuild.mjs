import fs from "fs-extra"

// get all mjs files in the dist folder
const files = await fs.readdir("dist")

// read the content of files that end with .mjs
const mjsFiles = files.filter((file) => file.endsWith(".mjs"))

// replace the content of the files
await Promise.all(
  mjsFiles.map(async (file) => {
    const content = fs.readFileSync(`dist/${file}`, "utf8")
    // look for next/(*) and replace with "next/(*).js" equivalent
    const newContent = content.replace(/next\/(\w+)/g, "next/$1.js")
    // write the new content to the file
    fs.writeFileSync(`dist/${file}`, newContent)
  }),
)
