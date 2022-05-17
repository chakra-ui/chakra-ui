import { readFileSync } from "fs"
import { postTweet } from "./utils/twitter-utils"

async function main() {
  const artifact = JSON.parse(readFileSync(".tweetrc", "utf8"))
  const result = await postTweet(artifact)
  console.log("Tweeted to @chakra_ui account:", result.data.id)
}

main().catch((err) => {
  console.log(err)
})
