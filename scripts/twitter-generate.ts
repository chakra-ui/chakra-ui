import fs from "fs"
import { generateTweetArtifact } from "./utils/twitter-utils"

async function main() {
  const artifact = await generateTweetArtifact()
  fs.writeFileSync(".tweetrc", JSON.stringify(artifact, null, 2))
}

main().catch((err) => {
  console.log(err)
})
