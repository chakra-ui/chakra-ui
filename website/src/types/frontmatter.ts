export interface FrontmatterHeading {
  level: string | number
  text: string
  id: string
}

export interface Frontmatter {
  slug?: string
  title: string
  description?: string
  editUrl?: string
  version?: string
  headings?: FrontmatterHeading[]
  publishedDate?: Date
  authorData?: any
}
