import React from 'react'

const Comments = ({ comment }) => {
   return (
      <div className="comment">
         <div className="comment__author">
            <span>{comment.author ? comment.author.username : comment.name}:</span>
            <strong>
            {new Intl.DateTimeFormat('en-GB', {
                     year: 'numeric',
                     month: 'short',
                     day: '2-digit',
                     hour: 'numeric',
                     minute: 'numeric'
                  }).format(comment.created_at)}
            </strong>
            
         </div>
         {comment.content}
      </div>
   )
}

export default Comments
