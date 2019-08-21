const remarkPlugins = [
  require("remark-autolink-headings"),
  require("remark-emoji"),
  require("remark-images"),
  require("remark-slug"),
  require("remark-unwrap-images"),
];

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
  },
});

module.exports = withMDX({
  target: "serverless",
  pageExtensions: ["js", "jsx", "md", "mdx"],
});
