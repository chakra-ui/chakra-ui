import fs from "fs"
import path from "path"
import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const getNodeContributors = async (relativePath) => {
  const { data: commits } = await octokit.repos.listCommits({
    owner: "chakra-ui",
    repo: "chakra-ui",
    sha: "develop",
    path: relativePath,
  })
  const orderedCommits = orderByCommitAuthorDate(commits)
  const contributors = orderedCommits
    .map(getCommitAuthorDetails)
    .map(
      ({
        commit: {
          author: { name },
        },
        author: { avatar_url: image, html_url: url },
      }) => ({
        name,
        image,
        url,
      }),
    )
  return contributors
}

const sortMembers = (a, b) => {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
}

const getMemberData = async ({ login }) => {
  const { data: user } = await octokit.users.getByUsername({ username: login })
  const {
    avatar_url: avatarUrl,
    html_url: githubUrl,
    blog: websiteUrl,
    bio,
    name,
    twitter_username: twitterUsername,
  } = user
  return { login, avatarUrl, githubUrl, websiteUrl, bio, name, twitterUsername }
}

const getOrgMembers = async () => {
  const { data: members } = await octokit.orgs.listMembers({ org: "chakra-ui" })
  const sorted = members.sort(sortMembers)
  return await Promise.all(sorted.map(getMemberData))
}

const readAllContributorsRc = () => {
  const rcPath = path.resolve("..", ".all-contributorsrc")
  const contributorsRcData = fs.readFileSync(rcPath, "utf-8")
  const { contributors } = JSON.parse(contributorsRcData)
  return contributors
}

module.exports = {
  getNodeContributors,
  getOrgMembers,
  readAllContributorsRc,
}
