const { getEditUrl, addLeadingSlash } = require("@docusaurus/utils")
const { Octokit } = require("@octokit/rest")
const format = require("date-fns/format")
const fromUnixTime = require("date-fns/fromUnixTime")
const execa = require("execa")
const path = require("path")

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
    author: authorData,
    editUrl,
    lastEdited,
    slug,
    tags,
  }
}

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str) {
  if (!str) {
    return null
  }

  const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/u
  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX)

  if (!temp || temp.length < 3) {
    return null
  }

  const [_, timestamp, author] = temp
  const dateStr = fromUnixTime(Number(timestamp))

  return {
    author,
    date: format(dateStr, "MMMM dd, yyyy"),
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
    // eslint-disable-next-line no-console
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
    avatarUrl,
    bio,
    githubUrl,
    login: username,
    name,
    twitterUsername,
    websiteUrl,
  }
}

module.exports = {
  fileToPath,
  getGithubUserData,
  getLastEdited,
  getTimestampAndAuthor,
  processFrontmatter,
}
