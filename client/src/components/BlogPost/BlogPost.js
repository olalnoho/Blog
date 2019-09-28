import React from 'react'
import { Link } from 'react-router-dom'
const BlogPost = ({ post }) => {
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
            <Link to={`/post/${post.id}`} className="heading-3">{post.title} </Link>
            <strong>{time} </strong>
         </div>
         <div className="blogpost__content">
            {post.content}
         </div>
      </div>
   )
}

export default BlogPost
