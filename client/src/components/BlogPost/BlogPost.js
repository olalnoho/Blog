import React from 'react'
const BlogPost = ({post}) => {
   const time = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
   }).format(post.created_at)

   return (
      <div className="blogpost">
         <div className="blogpost__heading">
            <h3 className="heading-3">{post.title}</h3>
            <strong>{time} </strong>
         </div>
         <div className="blogpost__content">
            {post.content}
         </div>
      </div>
   )
}

export default BlogPost
