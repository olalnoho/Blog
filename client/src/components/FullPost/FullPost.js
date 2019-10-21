import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import Comments from './Comments'
import CreateComment from './CreateComment'

const query = gql`
   query($id: ID!) {
     getPost(id: $id) {
       id
       title,
       content,
       created_at
       comments {
          id
          name
          content
          created_at
          author {
             username
          }
       }
     }
   }
`
const FullPost = props => {
   const id = props.match.params.id
   const { data, error, loading } = useQuery(query, { variables: { id } })
   if (data) {
      console.log(data)
   }
   if (loading) return <div className="container" />
   return (
      <div className="container">
         <div className="fullpost">
            {error && error.graphQLErrors.map(err => <p className="error" key={err.message}> {err.message} </p>)}
            <div className="fullpost__header">
               <h3 className="heading-3">{data && data.getPost.title}</h3>
               <strong>
                  {new Intl.DateTimeFormat('en-GB', {
                     year: 'numeric',
                     month: 'short',
                     day: '2-digit',
                     hour: 'numeric',
                     minute: 'numeric'
                  }).format(data.getPost.created_at)}
               </strong>
            </div>
            <div className="fullpost__content">
               {data && data.getPost.content}
            </div>
            {data && <div className="fullpost__createcomment">
               <CreateComment query={query} postId={data.getPost.id}/>
            </div>}
            <div className="fullpost__comments">
               <h3 className="heading-3">
                  Comments
               </h3>
               {
                  data && data.getPost.comments.length > 0 ?
                     data.getPost.comments.map(comment => {
                        return <Comments key={comment.id} id={comment.id} comment={comment} />
                     }) : <span> No comments yet </span>
               }
            </div>
         </div>
      </div>
   )
}

export default FullPost
