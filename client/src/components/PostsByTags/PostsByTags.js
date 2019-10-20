import React from 'react'
import BlogPost from '../BlogPost/BlogPost'
import { useQuery } from '@apollo/react-hooks'
import tagQuery from '../../queries/tagPosts'
import Spinner from '../UI/Spinner/Spinner'
const Tags = props => {
   const currentTag = props.match.params.tag
   const { data, loading, error } = useQuery(tagQuery, { variables: { tag: currentTag }, fetchPolicy: 'network-only' })

   if (loading) {
      if (loading) return <div className="container">
         <Spinner />
      </div>
   }
   return (
      <div className="container column">
         <div className="landing">
            {error && error.graphQLErrors.map(err => <p className="error" key={err.message}> {err.message} </p>)}
            <div className="landing__post">
               {data && data.getPostsByTag.map(post => {
                  return <BlogPost key={post.id} post={post} />
               })}
            </div>
         </div>
      </div>
   )
}

export default Tags
