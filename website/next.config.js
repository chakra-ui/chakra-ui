const withMdxEnhanced = require("next-mdx-enhanced")

module.exports = withMdxEnhanced({
  layoutPath: "layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [
    require("remark-autolink-headings"),
    require("remark-emoji"),
    require("remark-footnotes"),
    require("remark-images"),
    require("remark-slug"),
    require("remark-toc"),
    require("remark-unwrap-images"),
  ],
  rehypePlugins: [],
  extendFrontMatter: {
    process: (_, frontmatter) => ({
      slug: frontmatter.__resourcePath.replace(".mdx", ""),
    }),
  },
})(/* your normal nextjs config */)
