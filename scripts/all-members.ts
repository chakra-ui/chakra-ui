import { Octokit } from "@octokit/rest"
import fs from "fs"
import { config } from "dotenv"

config()
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

function sortMembers(a: any, b: any) {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
}

async function getMembers() {
  const { data: members } = await octokit.orgs.listMembers({ org: "chakra-ui" })

  const membersData = await Promise.all(
    members.map(async (member) => {
      if (!member) {
        return null
      }

      const { data } = await octokit.users.getByUsername({
        username: member.login,
      })

      return {
        login: data.login,
        avatar_url: data.avatar_url,
        url: data.html_url,
        blog: data.blog,
        name: data.name,
        bio: data.bio,
        twitter_username: data.twitter_username,
        location: data.location,
      }
    }),
  )

  const result = { members: membersData.filter(Boolean).sort(sortMembers) }
  fs.writeFileSync(".all-membersrc", JSON.stringify(result, null, 2))
}

try {
  getMembers()
} catch (err) {
  console.log(err)
}
