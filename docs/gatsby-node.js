const path = require("path")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // only adds fields to `Mdx` nodes
  if (node.internal.type === `Mdx`) {
    const { slug, collection } = processMdxFileNode(getNode(node.parent))

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

/**
 * Determine the `slug` and `collection` for an mdx `File` node.
 *
 * slug: the url path for the node (`/usedisclosure`)
 *
 * collection: the collection the node belongs to the
 *  (`utilities/useDisclosure.mdx` belongs to `utilities`; `getting-started.mdx`
 *  belongs to `main`)
 */
const processMdxFileNode = node => {
  // example file: "src/pages/utilities/useDisclosure.mdx"
  // name: "useDisclosure"
  // relativePath: "utilities/useDisclosure.mdx"
  const { name, relativeDirectory } = node

  // collection is just the relativeDirectory. this way we can identify and
  // group pages that belong together, like components or utilities
  const collection = relativeDirectory.length ? relativeDirectory : "main"

  const slug = name.toLowerCase()

  return {
    collection,
    slug,
  }
}
