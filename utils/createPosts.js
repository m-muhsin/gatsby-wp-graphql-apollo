const postTemplate = require.resolve("../src/templates/posts/single")
const blogTemplate = require.resolve("../src/templates/posts/archive")

module.exports = async ({ actions, graphql }) => {
  const {
    data: {
      allWpPost: { nodes: postNodes },
    },
  } = await graphql(`
    query ALL_POST_NODES {
      allWpPost(sort: {order: DESC, fields: date}) {
        nodes {
          id
          databaseId
          title
          excerpt
          content
          slug
          date
        }
      }
    }
  `)

  await Promise.all(
    postNodes.map(async node => {
      const { slug, id, databaseId } = node

      await actions.createPage({
        component: postTemplate,
        path: `blog/${slug}`,
        context: {
          id,
          ...node,
          databaseId,
        },
      })
    })
  )

  const nodeIds = postNodes.map(node => node.databaseId)

  await actions.createPage({
    component: blogTemplate,
    path: `/blog/`,
    context: {
      ids: nodeIds,
      nodes: postNodes,
    },
  })
}
