import {
  DEFAULT_PARSE_FRONT_MATTER,
  fileToPath,
  parseMarkdownFile,
  posixPath,
  removePrefix,
} from '@docusaurus/utils'
import { globSync } from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'
import toc from 'markdown-toc'
import { join } from 'path'
import prettier from 'prettier'

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
  const filePath = posixPath(file)
  const processCWD = posixPath(process.cwd())

  const markdownString = readFileSync(file).toString()

  const { content, frontMatter: _frontMatter } = await parseMarkdownFile({
    filePath: file,
    fileContent: markdownString,
    parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER,
  })

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

async function main() {
  const files = globSync('content/**/*.mdx', {
    cwd: process.cwd(),
    ignore: ['/tutorial'],
  })

  const json = await Promise.all(files.map((file) => getMDXMeta(file)))

  const content = await prettier.format(JSON.stringify(json), {
    parser: 'json',
  })

  const outPath = join(process.cwd(), 'configs', 'search-meta.json')

  writeFileSync(outPath, content)
  console.log('Search meta is ready ✅')
}

main()
