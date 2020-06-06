exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)
  const eventTemplate = require.resolve(`./src/templates/eventTemplate.js`)
  const blogpostTemplate = require.resolve(
    `./src/templates/blogpostTemplate.js`
  )
  const DocTemplate = require.resolve(`./src/templates/docTemplate.js`)

  // get pages and blog posts
  const result = await graphql(`
    {
      pages: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "page" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
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
            }
          }
        }
      }
      events: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "event" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
      docs: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "doc" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
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

  // events array for event nav
  const events = result.data.events.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // docs array for event nav
  const docs = result.data.docs.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // build pages
  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        blogposts,
        events,
        docs,
      },
    })
  })

  // build blog posts
  result.data.blogposts.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogpostTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        blogposts,
      },
    })
  })

  // build events
  result.data.events.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: eventTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        events,
      },
    })
  })

  result.data.docs.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: DocTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        docs,
      },
    })
  })
}
