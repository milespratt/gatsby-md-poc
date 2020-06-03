exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)
  const blogpostTemplate = require.resolve(
    `./src/templates/blogpostTemplate.js`
  )

  // get pages and blog posts
  const result = await graphql(`
    {
      pages: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        limit: 1000
        filter: { frontmatter: { type: { ne: "blogpost" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              type
            }
          }
        }
      }
      blogposts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "blogpost" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              type
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // page array for nav
  const pages = result.data.pages.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // blogpost array for blog post nav
  const blogposts = result.data.blogposts.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // build pages
  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        pages,
        blogposts,
      },
    })
  })

  // build blog posts
  result.data.blogposts.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogpostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        pages,
        blogposts,
      },
    })
  })
}
