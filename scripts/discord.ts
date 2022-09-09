import fs from "fs"
import Discord from "discord.js"
import { config } from "dotenv"
import ora from "ora"
import { outdent } from "outdent"

config()

const CHANNELS = {
  ANNOUNCEMENT: "660865232004055050",
}

const intents = new Discord.Intents([
  "GUILDS",
  "GUILD_MESSAGES",
  "GUILD_MESSAGE_TYPING",
])

function start() {
  const client = new Discord.Client({ ws: { intents } })
  const spinner = ora("Logging in discord client...").start()

  client.login(process.env.DISCORD_BOT_TOKEN)

  function exit(code?: number) {
    client.destroy()
    spinner.stop()
    process.exit(code)
  }

  client.on("ready", async () => {
    spinner.succeed("Client logged in")
    spinner.start("Setting up client...")

    const guild = client.guilds.cache.find(
      (guild) => guild.name === "Chakra UI",
    )

    if (guild) {
      spinner.succeed("Found guild: Chakra")

      const channel = client?.channels.cache.find(
        (channel) => channel.isText() && channel.id === CHANNELS.ANNOUNCEMENT,
      ) as Discord.TextChannel | null

      channel?.startTyping()

      await Discord.Util.delayFor(1000)
      spinner.start("Reading Changelog.md...")

      let [content] = JSON.parse(
        fs.readFileSync(".changelog/manifest.json", "utf8"),
      )
      content = outdent`
      **New Release Update :tada: v${content.version}**
      
      Read the changelog here:
      https://github.com/chakra-ui/chakra-ui/blob/main/.changelog/v${content.version}.mdx
      `

      spinner.succeed().start("Posting Changelog content to #annoucement")

      const msgs = Discord.Util.splitMessage(content)
      const promises = msgs.map((msg) => channel?.send(msg))
      await Promise.all(promises)

      channel?.stopTyping()

      spinner.succeed("Changelog posted to Discord: #announcement")
      exit(0)
    } else {
      spinner.fail("Cannot find guild: Chakra")
      exit(1)
    }
  })

  client.on("error", (err) => {
    console.log(err.message)
    exit(1)
  })
}

start()
