import React from "react"
import { graphql } from "gatsby"

export default function Template(props) {
  const {
    pageContext: { pages, blogposts },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <nav>
        {pages.map(page => {
          return (
            <a key={page.path} href={page.path}>
              {page.title}
            </a>
          )
        })}
      </nav>
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {frontmatter.slug.includes("/blog") && (
          <>
            <h2>Blog Posts</h2>
            <nav>
              {blogposts.map(blogpost => {
                return (
                  <a key={blogpost.path} href={blogpost.path}>
                    {blogpost.title}
                  </a>
                )
              })}
            </nav>
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
