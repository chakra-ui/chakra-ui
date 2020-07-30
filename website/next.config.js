const withMdxEnhanced = require("next-mdx-enhanced")

module.exports = withMdxEnhanced({
  layoutPath: "layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [
    require("remark-autolink-headings"),
    require("remark-emoji"),
    require("remark-footnotes"),
    require("remark-github"),
    require("remark-images"),
    require("remark-slug"),
    require("remark-toc"),
    require("remark-unwrap-images"),
  ],
  rehypePlugins: [],
  extendFrontMatter: {
    // process: (mdxContent, frontMatter) => {},
    phase: "prebuild|loader|both",
  },
})(/* your normal nextjs config */)
