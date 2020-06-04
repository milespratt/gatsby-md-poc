import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import LinkList from "../components/LinkList"

export default function Template(props) {
  // extract pages, posts, and events lists from props
  const {
    pageContext: { pages, blogposts, events },
  } = props
  // get parsed markdown data
  const { markdownRemark } = props.data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout pages={pages}>
      {/* show our page title and the generated page html */}
      <h1>{frontmatter.title}</h1>
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {/* if the page slug inludes /blog, render a list of all blogposts */}
      {frontmatter.slug.includes("/blog") && (
        <>
          <h2>Blog Posts</h2>
          <LinkList links={blogposts} />
        </>
      )}
      {/* if the page slug inludes /events, render a list of all events */}
      {frontmatter.slug.includes("/events") && (
        <>
          <h2>Events</h2>
          <LinkList links={events} />
        </>
      )}
    </Layout>
  )
}

// query to generate page html
// uses slug passed in props
// (gatsby-node.js)
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`
