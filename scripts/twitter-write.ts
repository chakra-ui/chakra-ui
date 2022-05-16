import { generateTweetArtifact, postTweet } from "./utils/twitter-utils"

async function main() {
  const artifact = await generateTweetArtifact()
  const result = await postTweet(artifact)
  console.log("Tweeted to @chakra_ui account:", result.data.id)
}

main().catch((err) => {
  console.log(err)
})
