import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment/moment'

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
  const { data: queriedData } = useQuery(GET_COMMENTS, {
    variables: { id },
  })

  return queriedData?.post?.comments?.nodes?.length ? (
    <div className="comments">
      <h2>Comments</h2>
      <div>
        {queriedData.post.comments.nodes.map((comment) => {
          const formatted = `${moment(comment.date).format(
            'MMMM Do YYYY'
          )} at ${moment(comment.date).format('h:mm:ss a')}`

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
              {comment?.children?.nodes?.map((childComment) => (
                <div key={childComment.commentId}>
                  <h4 className="comment-autor">
                    {childComment?.author?.name}
                  </h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: childComment?.content,
                    }}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    ''
  )
}

export default CommentsList
