import { blogs, docs, guides } from "@/.velite"
import type { MetadataRoute } from "next"
import { getPublishedShipped } from "./shipped/utils"

const baseUrl = "https://chakra-ui.com"

const pages = ["", "/blog", "/guides", "/shipped", "/showcase", "/playground"]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}` })),
    ...docs.map((doc) => ({ url: `${baseUrl}/${doc.slug}` })),
    ...blogs
      .filter((blog) => !blog.draft)
      .map((blog) => ({ url: `${baseUrl}/${blog.slug}` })),
    ...guides.map((guide) => ({ url: `${baseUrl}/${guide.slug}` })),
    ...getPublishedShipped().map((story) => ({
      url: `${baseUrl}/shipped/${story.slug}`,
    })),
  ]
}
