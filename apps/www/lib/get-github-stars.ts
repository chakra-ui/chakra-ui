import { Octokit } from "@octokit/rest"
import { numberFormatter } from "./number-formatter"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

// "https://api.npms.io/v2/package/@chakra-ui%2Freact"
export async function getGithubStars() {
  let count: number

  try {
    const repo = await octokit.repos.get({
      owner: "chakra-ui",
      repo: "chakra-ui",
    })

    // Validate that the response has the expected structure
    if (repo.data && typeof repo.data.stargazers_count === "number") {
      count = repo.data.stargazers_count
    } else {
      console.log("Invalid GitHub API response structure:", repo.data)
      count = 36_700
    }
  } catch (error: any) {
    console.log("Failed to get github stars: ", error.toString())
    count = 19_700
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
