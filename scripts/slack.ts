import { config } from "dotenv"
import { readFile } from "fs/promises"
import fetch from "node-fetch"

config()

async function getLatestVersion() {
  let [content] = JSON.parse(await readFile(".changelog/manifest.json", "utf8"))
  return content.version
}

export async function main() {
  const url = process.env.SLACK_WEBHOOK_URL

  if (!url) {
    throw new Error("Missing Slack Webhook URL")
  }

  const version = await getLatestVersion()

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      project: "chakra-ui",
      version,
      url: `https://github.com/chakra-ui/chakra-ui/blob/main/.changelog/v${version}.mdx`,
      discord:
        "https://discordapp.com/channels/660863154703695893/660865232004055050",
      twitter: "https://twitter.com/chakra_ui",
    }),
  })

  if (response.ok) {
    console.log("✅ Successfully sent message to Slack")
  } else {
    console.error("❌ Failed to send message to Slack")
  }
}

main()
