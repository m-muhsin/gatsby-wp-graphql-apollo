import React from "react"
import striptags from "striptags"
import moment from "moment"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Comments from "../../components/comments"

const SinglePost = props => {
  const {
    pageContext: { id, databaseId, title, content, excerpt, date },
    data,
  } = props

  // maximum number of characters to extract
  const maxLength = 240

  // getting the excerpt to a variable
  let excerptText = excerpt

  // if excerpt does not exist
  if (!excerptText) {
    // getting the first 240 characters off content
    excerptText = content.substr(0, maxLength)

    // so that a word is not chopped off halfway
    excerptText = content
      .substr(0, Math.min(excerptText.length, excerptText.lastIndexOf(" ")))
      .concat("...")
  }

  excerptText = striptags(excerptText)

  return (
    <Layout classNames="styled-text">
      <SEO
        title={title}
        description={striptags(excerptText)}
        image={data?.wpPost?.featuredImage?.sourceUrl}
      />
      <article
        data-id={id}
        id={`post-${databaseId}`}
        className={`post-${databaseId} post type-post status-publish format-standard hentry entry`}
      >
        <header className="entry-header">
          <h1
            className="entry-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <span className="posted-on">
            <time
              className="entry-date published updated"
              dateTime={moment(date).format("YYYY-MM-DDTHH:mm:ssZ")}
            >
              {moment(date).format(`MMMM D, YYYY`)}
            </time>
          </span>
        </header>

        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <footer className="entry-footer" />
      </article>
      <hr />
      <Comments id={id} databaseId={databaseId} />
    </Layout>
  )
}

export default SinglePost
