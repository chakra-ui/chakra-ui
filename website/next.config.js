const withMdx = require("next-mdx-enhanced")
const path = require("path")
const execa = require("execa")
const fromUnixTime = require("date-fns/fromUnixTime")
const format = require("date-fns/format")
const { getEditUrl, addLeadingSlash } = require("@docusaurus/utils")
const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

async function getUserData(username) {
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

const EDIT_URL = "https://github.com/chakra-ui/chakra-ui/edit/develop/website"

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
      "--follow",
      "--",
      filePath,
    ])
    return getTimestampAndAuthor(stdout)
  } catch (error) {
    console.error(error)
  }
}

const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str) {
  if (!str) return null

  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX)

  if (!temp || temp.length < 3) return null

  const [_, timestamp, author] = temp
  const dateStr = fromUnixTime(+timestamp)

  return {
    date: format(dateStr, "MMMM dd, yyyy"),
    author,
  }
}

function fileToPath(str) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

module.exports = withMdx({
  layoutPath: "layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [
    require("remark-autolink-headings"),
    require("remark-emoji"),
    require("remark-footnotes"),
    require("remark-images"),
    require("remark-slug"),
    require("remark-toc"),
    require("remark-unwrap-images"),
  ],
  rehypePlugins: [],
  extendFrontMatter: {
    process: async (_, frontmatter) => {
      const { __resourcePath: mdxPath, author, tags } = frontmatter

      // read the file path
      const filePath = path.join(process.cwd(), "pages", mdxPath)

      // get the last edited author and date
      const lastEdited = await getLastEdited(filePath)

      // get the edit url
      const editUrl = getEditUrl(path.join(mdxPath), EDIT_URL)

      // get the slug
      const slug = fileToPath(mdxPath)

      // if frontmatter inclues author, add the author's data
      const authorData = author ? await getUserData(author) : undefined

      return {
        slug,
        lastEdited,
        editUrl,
        author: authorData,
        tags,
      }
    },
  },
})(/* your normal nextjs config */)
