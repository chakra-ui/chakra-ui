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
    image: "/authors/segun-headshot.png",
    x: { url: "https://x.com/thesegunadebayo", username: "@thesegunadebayo" },
  },
  esther: {
    name: "Esther Adebayo",
    image: "/authors/esther-headshot.jpg",
    x: { url: "https://x.com/_estheradebayo", username: "@_estheradebayo" },
  },
  eelco: {
    name: "Eelco Wiersma",
    image: "/authors/eelco-headshot.png",
    x: { url: "https://x.com/eelcodotdev", username: "@eelcodotdev" },
  },
  kolawole: {
    name: "Tioluwani Kolawole",
    image: "/authors/kolawole-headshot.jpg",
    x: { url: "https://x.com/TioluwaniK", username: "@TioluwaniK" },
  },
}

export const getBlogAuthor = (author: string): Author => {
  return authorMap[author] ?? {}
}
