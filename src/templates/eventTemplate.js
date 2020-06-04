import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import LinkList from "../components/LinkList"

export default function Template(props) {
  const {
    pageContext: { pages, events },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout pages={pages}>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div
        className="event-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <h2>Events</h2>
      <LinkList links={events} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
