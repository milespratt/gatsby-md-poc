import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"

import "../css/doc.css"

export default function Template(props) {
  const {
    pageContext: { pages, docs },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout pages={pages}>
      <div className="doc-container">
        <Sidebar pages={docs} />
        <div>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div
            className="doc-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
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
