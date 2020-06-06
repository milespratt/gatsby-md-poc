import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"

export default function Template(props) {
  const {
    pageContext: { pages, blogposts, events, docs },
  } = props
  const { markdownRemark } = props.data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout pages={pages}>
      <div style={frontmatter.slug.includes("/docs") ? {display: 'flex'} : {}}>
        {frontmatter.slug.includes("/docs") && (
          <Sidebar pages={docs} />
        )}
        <div>
          <h1>{frontmatter.title}</h1>
          <div
            className="page__content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {frontmatter.slug.includes("/blog") && (
            <>
              <h2>Blog Posts</h2>
              <nav>
                {blogposts.map(blogpost => {
                  return (
                    <Link key={blogpost.path} to={blogpost.path}>
                      {blogpost.title}
                    </Link>
                  )
                })}
              </nav>
            </>
          )}
          {frontmatter.slug.includes("/events") && (
            <>
              <h2>Events</h2>
              <nav>
                {events.map(event => {
                  return (
                    <Link key={event.path} to={event.path}>
                      {event.title}
                    </Link>
                  )
                })}
              </nav>
            </>
          )}
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
        slug
        title
      }
    }
  }
`
