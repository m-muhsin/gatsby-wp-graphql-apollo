import React from 'react'
import CommentsList from './comments-list'
import CommentInput from './comment-input'

const Comments = ({ id, databaseId }) => (
  <div className="entry-content">
    <CommentsList id={id} />
    <hr className="styled-separator" />
    <CommentInput id={id} databaseId={databaseId} />
  </div>
)

export default Comments
