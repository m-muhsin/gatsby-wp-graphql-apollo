import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const BlogArchive = ({ pageContext }) => (
  <Layout classNames="blog">
    <SEO title="Articles" description="A collection of posts by Muhammad" />
    <header className="entry-header">
      <h1 className="entry-title">Blog</h1>
    </header>
    <div id="blog">
      {pageContext.nodes &&
        pageContext.nodes.map(post => {
          return (
            <Link to={`blog/${post.slug}`}>
              <h2
                key={post.id}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </Link>
          )
        })}
    </div>
  </Layout>
)

export default BlogArchive
