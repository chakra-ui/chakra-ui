const { getEditUrl, addLeadingSlash } = require("@docusaurus/utils")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const { Octokit } = require("@octokit/rest")
const format = require("date-fns/format")
const fromUnixTime = require("date-fns/fromUnixTime")
const execa = require("execa")
const withPlugins = require("next-compose-plugins")
const withMdx = require("next-mdx-enhanced")
const path = require("path")
const remarkAutolinkHeadings = require("remark-autolink-headings")
const remarkEmoji = require("remark-emoji")
const remarkImages = require("remark-images")
const remarkSlug = require("remark-slug")
const remarkToc = require("remark-toc")
const remarkUnwrapImages = require("remark-unwrap-images")

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

async function getUserData(username) {
  try {
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
  } catch {
    // given a user no longer exists, octokit will error
  }
}

const EDIT_URL =
  "https://github.com/chakra-ui/chakra-ui/edit/develop/website/pages"

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
  } catch {
    // console.error(error)
  }
}

const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/u

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str) {
  if (!str) {
    return null
  }

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

function fileToPath(str) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

const defaultConfig = {
  experimental: {
    modern: true,
    optimizeFonts: true,
    optimizeImages: true,
  },
  redirects: require("./next-redirect"),
  target: "serverless",
  webpack: (config) => {
    return {
      ...config,
      externals: [...config.externals, "sharp"],
    }
  },
}

const mdxConfig = {
  defaultLayout: true,
  extendFrontMatter: {
    process: async (_, frontmatter) => {
      const { __resourcePath: mdxPath, author, tags } = frontmatter

      // read the file path
      const filePath = path.join(process.cwd(), "pages", mdxPath)

      // get the last edited author and date
      const lastEdited = await getLastEdited(filePath)

      // get the edit url
      const editUrl = getEditUrl(mdxPath, EDIT_URL)

      // get the slug
      const slug = fileToPath(mdxPath)

      // if frontmatter inclues author, add the author's data
      const authorData = author ? await getUserData(author) : undefined

      return {
        author: authorData,
        editUrl,
        lastEdited,
        slug,
        tags,
      }
    },
  },
  fileExtensions: ["mdx"],
  layoutPath: "layouts",
  rehypePlugins: [],
  remarkPlugins: [
    remarkAutolinkHeadings,
    remarkEmoji,
    remarkImages,
    remarkSlug,
    remarkToc,
    remarkUnwrapImages,
  ],
}

module.exports = withPlugins(
  [withBundleAnalyzer, withMdx(mdxConfig)],
  defaultConfig,
)
