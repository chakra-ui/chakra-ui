import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
})

// "https://api.npms.io/v2/package/@chakra-ui%2Freact"
export async function getGithubStars() {
  let count: number

  try {
    const repo = await octokit.repos.get({
      owner: "chakra-ui",
      repo: "chakra-ui",
    })
    count = repo.data.stargazers_count
  } catch (error) {
    console.log(error.toString())
    count = 19_700
  }

  return {
    count,
    prettyCount: formatter.format(count),
  }
}
