const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const {
  sortPostNodes,
  getRelativePagePath,
  getNodeContributors,
  getOrgMembers,
  readAllContributorsRc,
} = require("./utils")

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // process mdx files
  if (node.internal.type === `Mdx`) {
    // `sourceInstanceName` is the name of the folder loaded by this file's
    // `gatsby-source-filesystem` instance. it'll be either `docs` or `guides`,
    // depending on the folder the file is in
    const { sourceInstanceName, relativeDirectory } = getNode(node.parent)

    // use `gatsby-source-filesystem` to create our slug
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "docs",
      trailingSlash: false,
    })

    const slug = relativeFilePath.toLowerCase()

    // create `slug` field (`node.fields.slug`)
    createNodeField({
      name: "slug",
      node,
      value: slug,
    })

    // create `source` field that matches `sourceInstanceName`
    // (`node.fields.source`)
    createNodeField({
      name: "source",
      node,
      value: sourceInstanceName,
    })

    if (sourceInstanceName === "docs") {
      // each docs page gets a "collection" which is used for dynamically
      // generating links sections
      const collection = relativeDirectory.length ? relativeDirectory : "main"

      // create `collection` field (`node.fields.collection`)
      createNodeField({
        name: "collection",
        node,
        value: collection,
      })
    }

    if (sourceInstanceName === "guides") {
      // each guides page get a list of "contributors" attached to it
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

const createDocsPages = async (nodes, { actions }) => {
  const { createPage } = actions
  const docsTemplate = path.resolve("./src/templates/docs.js")
  const sortedNodes = sortPostNodes(nodes)

  sortedNodes.forEach((node, index) => {
    const {
      fileAbsolutePath,
      fields: { slug },
      parent: { createdAt, updatedAt },
    } = node
    const previous = index === 0 ? null : sortedNodes[index - 1]
    const next =
      index === sortedNodes.length - 1 ? null : sortedNodes[index + 1]
    const relativePath = getRelativePagePath(fileAbsolutePath, "docs")

    createPage({
      path: slug,
      component: docsTemplate,
      context: {
        slug,
        layout: "docs",
        previous,
        next,
        createdAt,
        updatedAt,
        relativePath,
      },
    })
  })
}

const createGuidesPages = async (nodes, { actions }) => {
  const { createPage } = actions
  const guidesTemplate = path.resolve("./src/templates/guides.js")

  nodes.forEach((node) => {
    const {
      fileAbsolutePath,
      fields: { slug },
      parent: { createdAt, updatedAt },
    } = node
    const relativePath = getRelativePagePath(fileAbsolutePath, "guides")

    createPage({
      path: slug,
      component: guidesTemplate,
      context: {
        slug,
        layout: "guides",
        createdAt,
        updatedAt,
        relativePath,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      fragment PageInformation on Mdx {
        fileAbsolutePath
        frontmatter {
          title
          order
        }
        fields {
          collection
          slug
          source
        }
        parent {
          ... on File {
            createdAt: birthTime(formatString: "MMMM DD, YYYY")
            updatedat: modifiedTime(formatString: "MMMM DD, YYYY")
          }
        }
      }

      query AllMdxPages {
        docs: allMdx(filter: { fields: { source: { eq: "docs" } } }) {
          nodes {
            ...PageInformation
          }
        }
        guides: allMdx(filter: { fields: { source: { eq: "guides" } } }) {
          nodes {
            ...PageInformation
          }
        }
      }
    `,
  )

  const { docs, guides } = result.data

  await createDocsPages(docs.nodes, { actions })
  await createGuidesPages(guides.nodes, { actions })
}

exports.sourceNodes = async ({
  createNodeId,
  createContentDigest,
  actions,
}) => {
  const { createNode } = actions

  const contributors = await readAllContributorsRc()
  contributors.forEach(({ login, avatar_url }) => {
    const id = createNodeId(`contributors__${login}`)
    const contributor = { login, avatarUrl: avatar_url }
    const nodeContent = JSON.stringify(contributor)
    const nodeMeta = {
      id,
      internal: {
        type: "ChakraContributor",
        content: nodeContent,
        contentDigest: createContentDigest(contributor),
      },
    }
    const node = { ...contributor, ...nodeMeta }
    createNode(node)
  })

  const team = await getOrgMembers()
  team.forEach((member) => {
    const id = createNodeId(`team__${member.login}`)
    const nodeContent = JSON.stringify(member)
    const nodeMeta = {
      id,
      internal: {
        type: "TeamMember",
        content: nodeContent,
        contentDigest: createContentDigest(member),
      },
    }
    const node = { ...member, ...nodeMeta }
    createNode(node)
  })
}
