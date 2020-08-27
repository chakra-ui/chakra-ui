import { Octokit } from "@octokit/rest"
import fs from "fs"

require("dotenv").config()
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

function sortMembers(a, b) {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
}

async function getMembers() {
  const { data: members } = await octokit.orgs.listMembers({ org: "chakra-ui" })

  const membersData = await Promise.all(
    members.map(async ({ login }) => {
      const { data: member } = await octokit.users.getByUsername({
        username: login,
      })

      return {
        login: member.login,
        avatar_url: member.avatar_url,
        url: member.html_url,
        blog: member.blog,
        name: member.name,
        bio: member.bio,
        twitter_username: member.twitter_username,
        location: member.location,
      }
    }),
  )

  const data = { members: membersData.sort(sortMembers) }
  fs.writeFileSync(".all-membersrc", JSON.stringify(data, null, 2))
}

try {
  getMembers()
} catch (err) {
  console.log(err)
}
