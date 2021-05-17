import loadMDXFromPages from "utils/load-mdx-dir"

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTimeMinutes: number
}

export async function getBlogPosts() {
  const mdxData = await loadMDXFromPages("blog")
  return mdxData
    .map((blogPostData) => ({
      ...blogPostData,
      slug: blogPostData.slug.replace(/\/index$/, ""), // fix url
      author: blogPostData.author ?? null, // `undefined` cannot be serialized as JSON
      date: new Date(blogPostData.date).toISOString(),
      tags: Array.isArray(blogPostData.tags) ? blogPostData.tags : [],
    }))
    .sort(byDateDesc)
}

function byDateDesc(a: BlogPost, b: BlogPost) {
  const bTime = new Date(b.date).getTime()
  const aTime = new Date(a.date).getTime()

  return bTime - aTime
}
