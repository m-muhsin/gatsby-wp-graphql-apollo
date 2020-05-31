import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import uuid from "uuid"

const ADD_COMMENT = gql`
  mutation ADD_COMMENT(
    $content: String!
    $commentOn: Int!
    $commentAuthorName: String
    $commentAuthorWebsite: String
    $clientMutationId: String!
  ) {
    createComment(
      input: {
        content: $content
        commentOn: $commentOn
        author: $commentAuthorName
        authorUrl: $commentAuthorWebsite
        clientMutationId: $clientMutationId
      }
    ) {
      comment {
        content
      }
    }
  }
`

const CommentInput = ({ id, databaseId }) => {
  // Declare variables necessary to pass on to Apollo Mutation.
  let commentContentInput,
    commentAuthorNameInput,
    commentAuthorEmailInput,
    commentAuthorWebsiteInput

  // Set the initial state.
  const [commentContent, setCommentContent] = useState(``)
  const [commentAuthorName, setCommentAuthorName] = useState(``)
  const [commentAuthorEmail, setCommentAuthorEmail] = useState(``)
  const [commentAuthorWebsite, setCommentAuthorWebsite] = useState(``)
  const [showThanks, setShowThanks] = useState(false)

  // Using the Apollo mutation hook.
  const [addComment] = useMutation(ADD_COMMENT)

  const submitCommentForm = e => {
    // Preventing the default HTML behavior.
    e.preventDefault()

    // Do the Apollo mutation – add comment.
    addComment({
      variables: {
        content: commentContent,
        commentOn: databaseId,
        commentAuthorName,
        commentAuthorEmail,
        commentAuthorWebsite,
        clientMutationId: uuid(),
      },
    })

    // Show the thank you message now!
    setShowThanks(true)

    // Reset form inout values.
    commentContentInput.value = ""
    commentAuthorNameInput.value = ""
    commentAuthorEmailInput.value = ""
    commentAuthorWebsiteInput.value = ""
  }

  // Render comment form etc.
  return (
    <div className="comment-respond">
      <h2>Leave a Reply</h2>
      <form
        onSubmit={e => submitCommentForm(e)}
        id="commentform"
        className="section-inner thin max-percentage"
      >
        <p className="comment-form-comment">
          <label htmlFor="comment">Comment: </label>
          <span className="required">*</span>
          <br />
          <textarea
            onInput={event => setCommentContent(event.target.value)}
            ref={node => {
              commentContentInput = node
            }}
            style={{ width: 500, maxWidth: "100%" }}
            id="comment"
            name="comment"
            cols="50"
            rows="8"
            maxLength="65525"
            required="required"
            spellCheck="false"
          ></textarea>
        </p>
        <p className="comment-form-author">
          <label htmlFor="author">
            Name: <span className="required">*</span>
          </label>
          <br />
          <input
            onInput={event => setCommentAuthorName(event.target.value)}
            ref={node => {
              commentAuthorNameInput = node
            }}
            style={{ width: 500, maxWidth: "100%" }}
            id="author"
            name="author"
            type="text"
            size="30"
            maxLength="245"
            required="required"
          />
        </p>
        <p className="comment-form-email">
          <label htmlFor="email">
            Email: <span className="required">*</span>
          </label>
          <br />
          <input
            onInput={event => setCommentAuthorEmail(event.target.value)}
            ref={node => {
              commentAuthorEmailInput = node
            }}
            style={{ width: 500, maxWidth: "100%" }}
            id="email"
            name="email"
            type="email"
            size="30"
            maxLength="100"
            aria-describedby="email-notes"
            required="required"
          />
        </p>
        <p className="comment-form-url">
          <label htmlFor="url">
            Website: <span className="required">*</span>
          </label>
          <br />
          <input
            onInput={event => setCommentAuthorWebsite(event.target.value)}
            ref={node => {
              commentAuthorWebsiteInput = node
            }}
            style={{ width: 500, maxWidth: "100%" }}
            id="url"
            name="url"
            type="url"
            size="30"
            maxLength="200"
          />
        </p>
        <h4 style={{ display: showThanks ? "block" : "none" }}>
          Thanks for your comment. It will appear here once it's approved by the
          site owner.{" "}
          <span role="img" aria-label="smile">
            😊
          </span>
        </h4>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CommentInput
