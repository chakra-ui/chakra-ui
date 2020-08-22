import matter from "gray-matter"
import { calcReadTime } from "utils/calc-read-time"

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTimeMinutes: number
}

export async function getBlogPosts() {
  const context = require.context("../../pages/blog", true, /\.mdx$/)
  const posts: BlogPost[] = []

  for (const key of context.keys()) {
    const post = key.slice(2)
    const content = await import(`!!raw-loader!../../pages/blog/${post}`)
    const meta = matter(content.default)
    const slug =
      meta.data.slug || post.replace(".mdx", "").replace("/index", "")

    posts.push({
      slug,
      title: meta.data.title,
      date: new Date(meta.data.date).toISOString(),
      excerpt: meta.data.excerpt || `${meta.content.slice(0, 140).trim()}…`,
      tags: Array.isArray(meta.data.tags) ? meta.data.tags : [],
      readTimeMinutes: calcReadTime(meta.content),
    })
  }

  return posts.sort(byDateDesc)
}

function byDateDesc(a: BlogPost, b: BlogPost) {
  const bTime = new Date(b.date).getTime()
  const aTime = new Date(a.date).getTime()

  return bTime - aTime
}
