import { cleanFiles } from "./shared"

cleanFiles().catch((error) => {
  console.error(error)
  process.exit(1)
})
