import path from "path"
import execa from "execa"
import format from "date-fns/format"
import fromUnixTime from "date-fns/fromUnixTime"
import { addLeadingSlash, getEditUrl } from "@docusaurus/utils"
import { Dict } from "@chakra-ui/utils"
import { serialize } from "next-mdx-remote/serialize"
import matter from "gray-matter"

export async function serializeMdx(source: string) {
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        require("remark-autolink-headings"),
        require("remark-emoji"),
        require("remark-images"),
        require("remark-slug"),
        require("remark-toc"),
        require("remark-unwrap-images"),
      ],
    },
    scope: data,
  })
  return {
    source: mdxSource,
    frontMatter: data,
  }
}

export async function processFrontmatter<Options extends Dict>(
  options: Options,
) {
  const {
    path: mdxPath,
    author,
    tags = [],
    baseEditUrl = null,
    slug: _slug,
    ...rest
  } = options

  // read the file path
  const filePath = path.join(process.cwd(), "pages", mdxPath)

  // get the last edited author and date
  const lastEdited = await getLastEdited(filePath)

  // get the edit url
  const editUrl = getEditUrl(path.join(mdxPath), baseEditUrl)

  // get the slug
  const slug = _slug || fileToPath(mdxPath)

  // if frontmatter includes author, add the author's data
  //const authorData = !__DEV__ && author ? await getGithubUserData(author) : null

  const data = {
    ...rest,
    slug,
    lastEdited,
    editUrl,
    author,
    tags,
  }

  return data as typeof data & Options & { slug?: string; date?: string }
}

function fileToPath(str: string) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

/**
 * Format the last edited timestamp and author from git output
 */
function getTimestampAndAuthor(str: string) {
  if (!str) return null

  const GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX = /^(\d+), (.+)$/
  const temp = str.match(GIT_COMMIT_TIMESTAMP_AUTHOR_REGEX)

  if (!temp || temp.length < 3) return null

  const [, timestamp, author] = temp
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
async function getLastEdited(filePath: string) {
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
    return null
  }
}
