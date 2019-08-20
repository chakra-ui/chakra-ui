const mdPlugins = [
  require("remark-autolink-headings"),
  require("remark-emoji"),
  require("remark-images"),
  require("remark-slug"),
  require("remark-unwrap-images"),
];

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    mdPlugins,
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "md", "mdx"],
});
