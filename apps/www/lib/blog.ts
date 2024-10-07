export const formatBlogDate = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

interface Author {
  name: string
  image: string
  x: { url: string; username: string }
}

const authorMap: Record<string, Author> = {
  sage: {
    name: "Segun Adebayo",
    image: "https://bit.ly/sage-adebayo",
    x: { url: "https://x.com/sage_adebayo", username: "@thesegunadebayo" },
  },
  esther: {
    name: "Esther Adebayo",
    image: "/authors/esther-headshot.jpg",
    x: { url: "https://x.com/_estheradebayo", username: "@_estheradebayo" },
  },
}

export const getBlogAuthor = (author: string): Author => {
  return authorMap[author] ?? {}
}
