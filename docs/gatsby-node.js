const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // only adds fields to `Mdx` nodes
  if (node.internal.type === `Mdx`) {
    // get the `collection` using the parent `File` node's `relativeDirectory`
    const { relativeDirectory } = getNode(node.parent)
    const collection = relativeDirectory.length ? relativeDirectory : "main"

    // use `gatsby-source-filesystem` to create our slug
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "pages",
      trailingSlash: false,
    })
    const slug = relativeFilePath.toLowerCase()

    // create `slug` field (`node.fields.slug`)
    createNodeField({
      name: "slug",
      node,
      value: slug,
    })

    // create `collection` field (`node.fields.collection`)
    createNodeField({
      name: "collection",
      node,
      value: collection,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const docsTemplate = path.resolve("./src/templates/docs.js")

  // get nodes by `slug`
  const result = await graphql(
    `
      {
        allMdx {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `,
  )

  result.data.allMdx.nodes.forEach(node => {
    const slug = node.fields.slug
    createPage({
      // we use the generated slug for the path
      path: slug,

      // use the `docs` template for each of these pages
      component: docsTemplate,

      // otherwise known as `pageContext`
      context: {
        // attaching `slug` here allows `templates/docs.js` to access the value,
        // which it uses for finding this post to render its data
        slug,

        // this is attached so `layout.js` knows to use the sidebar layout for
        // these pages
        layout: "docs",
      },
    })
  })
}
