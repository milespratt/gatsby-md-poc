import React from "react"
import { graphql } from "gatsby"

import PageNav from "../components/PageNav"
import LinkList from "../components/LinkList"

export default function Template(props) {
  const {
    pageContext: { pages, events },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="event-container">
      <PageNav pages={pages} />
      <div className="event">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="event-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {frontmatter.slug.includes("/events") && (
          <>
            <h2>Events</h2>
            <LinkList links={events} />
          </>
        )}
      </div>
    </div>
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
