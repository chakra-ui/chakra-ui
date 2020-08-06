const path = require("path")
const execa = require("execa")
const fromUnixTime = require("date-fns/fromUnixTime")
const format = require("date-fns/format")
const { getEditUrl, addLeadingSlash } = require("@docusaurus/utils")
const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

function fileToPath(str) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

async function processFrontmatter(options) {
  const { path: mdxPath, author, tags, baseEditUrl, ...rest } = options

  // read the file path
  const filePath = path.join(process.cwd(), "pages", mdxPath)

  // get the last edited author and date
  const lastEdited = await getLastEdited(filePath)

  // get the edit url
  const editUrl = getEditUrl(path.join(mdxPath), baseEditUrl)

  // get the slug
  const slug = fileToPath(mdxPath)

  // if frontmatter inclues author, add the author's data
  const authorData = author ? await getGithubUserData(author) : undefined

  return {
    ...rest,
    slug,
    lastEdited,
    editUrl,
    author: authorData,
    tags,
  }
}

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str) {
  if (!str) return null

  const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/
  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX)

  if (!temp || temp.length < 3) return null

  const [_, timestamp, author] = temp
  const dateStr = fromUnixTime(+timestamp)

  return {
    date: format(dateStr, "MMMM dd, yyyy"),
    author,
  }
}

/**
 * Gets the last edited timestamp and author from git
 * using `git log`
 *
 * %an = author name
 * %ct = committer date, UNIX timestamp
 *
 * @see https://git-scm.com/docs/git-log
 */
async function getLastEdited(filePath) {
  try {
    const { stdout } = await execa("git", [
      "log",
      "-1",
      "--format=%ct, %an",
      filePath,
    ])
    return getTimestampAndAuthor(stdout)
  } catch (error) {
    console.error(error)
  }
}

async function getGithubUserData(username) {
  const { data } = await octokit.users.getByUsername({ username })

  const {
    avatar_url: avatarUrl,
    html_url: githubUrl,
    blog: websiteUrl,
    bio,
    name,
    twitter_username: twitterUsername,
  } = data

  return {
    login: username,
    avatarUrl,
    githubUrl,
    websiteUrl,
    bio,
    name,
    twitterUsername,
  }
}

module.exports = {
  getTimestampAndAuthor,
  fileToPath,
  getLastEdited,
  processFrontmatter,
  getGithubUserData,
}
