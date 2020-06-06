const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const {
  sortPostNodes,
  getRelativePagePath,
  getNodeContributors,
} = require("./utils")

exports.onCreateNode = async ({ node, actions, getNode }) => {
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

    if (collection === "guides") {
      const contributors = await getNodeContributors(node)
      createNodeField({
        name: "contributors",
        node,
        value: contributors,
      })
    }
  }
}

exports.createSchemaCustomization = (props) => {
  const { actions, schema } = props
  const { createTypes } = actions

  // define types for `Mdx.fields.contributors`
  const typeDefs = [
    `
    type Mdx implements Node {
      fields: MdxFields
    }
    type Contributor {
      name: String!
      image: String!
      url: String!
    }
  `,
    // we use buildObjectType here so we can default `contributors` to `[]`
    schema.buildObjectType({
      name: "MdxFields",
      fields: {
        contributors: {
          type: "[Contributor!]!",
          resolve(source) {
            return source.contributors || []
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const docsTemplate = path.resolve("./src/templates/docs.js")
  const guidesTemplate = path.resolve("./src/templates/guides.js")

  // get nodes by `slug`
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              parent {
                ... on File {
                  modifiedTime(formatString: "MMMM DD, YYYY")
                }
              }
            }
          }
          nodes {
            fileAbsolutePath
            frontmatter {
              title
              order
            }

            fields {
              collection
              slug
            }
          }
        }
      }
    `,
  )

  const { nodes, edges } = result.data.allMdx
  const sortedNodes = sortPostNodes(nodes)

  sortedNodes.forEach((node, index) => {
    const previous = index === 0 ? null : sortedNodes[index - 1]
    const next =
      index === sortedNodes.length - 1 ? null : sortedNodes[index + 1]
    const slug = node.fields.slug
    const relativePath = getRelativePagePath(node.fileAbsolutePath)
    const edge = edges[index]
    const { modifiedTime, birthTime } = edge.node.parent

    createPage({
      // we use the generated slug for the path
      path: slug,

      // use the `docs` template for each of these pages
      component:
        node.fields.collection === "guides" ? guidesTemplate : docsTemplate,

      // otherwise known as `pageContext`
      context: {
        // attaching `slug` here allows `templates/docs.js` to access the value,
        // which it uses for finding this post to render its data
        slug,

        // this is attached so `layout.js` knows to use the sidebar layout for
        // these pages
        layout: node.fields.collection === "guides" ? "guides" : "docs",

        // previous and next pages
        previous,
        next,
        modifiedTime,
        createdAt: birthTime,

        // relative path to file ('/docs/pages/getting-started.mdx')
        relativePath,
      },
    })
  })
}
