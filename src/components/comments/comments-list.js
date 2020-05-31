import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import moment from "moment/moment"

const GET_COMMENTS = gql`
  query CommentsQuery($id: ID!) {
    post(id: $id) {
      databaseId
      title
      comments {
        nodes {
          id
          commentId
          date
          content
          author {
            ... on CommentAuthor {
              id
              email
              name
              url
            }
            ... on User {
              id
              email
              name
            }
          }
          children {
            nodes {
              id
              commentId
              date
              content
              author {
                ... on CommentAuthor {
                  id
                  email
                  name
                  url
                }
                ... on User {
                  id
                  email
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

const CommentsList = ({ id }) => {
  // Get comments via Apollo GraphQL query hook.
  const { data: queriedData } = useQuery(GET_COMMENTS, {
    variables: { id },
  })

  // Show comments if they exist.
  return queriedData?.post?.comments?.nodes?.length ? (
    <div className="comments">
      <h2>Comments</h2>
      <div>
        {
          // Map through array of comment nodes.
          queriedData.post.comments.nodes.map(comment => {
            const formatted = `${moment(comment.date).format(
              "MMMM Do YYYY"
            )} at ${moment(comment.date).format("h:mm:ss a")}`

            // Show single comment.
            return (
              <div key={comment.commentId}>
                {comment?.author?.url ? (
                  <a href={comment.author.url}>
                    <h3 className="comment-autor">{comment?.author?.name}</h3>
                  </a>
                ) : (
                  <h3 className="comment-autor">{comment?.author?.name}</h3>
                )}
                <div className="comment-metadata">
                  <time className="comment-datetime">{formatted}</time>
                </div>
                <p dangerouslySetInnerHTML={{ __html: comment?.content }} />
                {
                  // Show comment's children (replies) if they exist.
                  comment?.children?.nodes?.map(childComment => (
                    <div key={childComment.commentId}>
                      <h3 className="comment-autor">
                        {childComment?.author?.name}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: childComment?.content,
                        }}
                      />
                    </div>
                  ))
                }
              </div>
            )
          })
        }
      </div>
    </div>
  ) : (
    ""
  )
}

export default CommentsList
