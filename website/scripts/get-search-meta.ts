import {
  fileToPath,
  parseMarkdownString,
  posixPath,
  removePrefix,
} from '@docusaurus/utils'
import fs from 'fs'
import toc from 'markdown-toc'
import path from 'path'
import prettier from 'prettier'
import shell from 'shelljs'

interface ResultType {
  content: string
  id: string
  url: string
  type: 'lvl1' | 'lvl2' | 'lvl3'
  hierarchy: {
    lvl1: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}

interface TOCResultItem {
  content: string
  slug: string
  lvl: 1 | 2 | 3
  i: number
  seen: number
}

const websiteRoot = 'content'

async function getMDXMeta(file: string) {
  // For Windows: convert backslashes to forwards slashes with `posixPath()` for consistency
  const filePath = posixPath(file)
  const processCWD = posixPath(process.cwd())

  const markdownString = fs.readFileSync(file).toString()

  const { content, frontMatter: _frontMatter } =
    await parseMarkdownString(markdownString)
  const frontMatter = _frontMatter as Record<string, any>
  const tableOfContent = toc(content)
  const json = tableOfContent.json as TOCResultItem[]
  const slug = fileToPath(filePath)
    .replace(`/${websiteRoot}`, '')
    .replace(processCWD, '')

  const result: ResultType[] = []

  result.push({
    content: frontMatter.title,
    id: slug,
    type: 'lvl1',
    url: removePrefix(slug, '/'),
    hierarchy: {
      lvl1: frontMatter.title,
    },
  })

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      id: slug,
      type: `lvl${item.lvl}` as any,
      url: removePrefix(slug, '/') + `#${item.slug}`,
      hierarchy: {
        lvl1: frontMatter.title,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ?? null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    })
  })

  return result
}

async function getSearchMeta() {
  let json: any = []

  const files = shell
    .ls('-R', websiteRoot)
    .map((file) => path.join(process.cwd(), websiteRoot, file))
    .filter((file) => file.endsWith('.mdx'))

  /**
   * File paths to not be included in the search meta.
   *
   * This can be overall page sections (i.e. "/docs", "/tutorial", etc.) or specific files. (i.e. "/guides/first-steps")
   */
  const excludedSlugs = ['/tutorial']

  for (const file of files) {
    let result: any[] = []

    // Windows OS: ensure file paths have forward slashes.
    const fileToPosixPath = posixPath(file)

    const isExcluded = !!excludedSlugs.find((excludedSlug) =>
      fileToPosixPath.includes(excludedSlug),
    )

    try {
      result = isExcluded ? [] : await getMDXMeta(file)
      json.push(...result)
    } catch (error) {
      console.log(error)
    }
  }

  json = prettier.format(JSON.stringify(json), { parser: 'json' })
  const outPath = path.join(process.cwd(), 'configs', 'search-meta.json')
  fs.writeFileSync(outPath, json)
  console.log('Search meta is ready ✅')
}

getSearchMeta()
