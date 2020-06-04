import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

export default function Template(props) {
  const {
    pageContext: { pages, blogposts },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout pages={pages}>
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
                  <Link key={blogpost.path} to={blogpost.path}>
                    {blogpost.title}
                  </Link>
                )
              })}
            </nav>
          </>
        )}
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
