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

   // The BlogPost component expects offset as a prop
   // So if a post is deleted, it can refetch the posts
   // on the page you were on.
   // which is why were getting it here.
   
   const prevOffset = localStorage.getItem('offset')
   return (
      <div className="container column">
         <div className="landing">
            {error && error.graphQLErrors.length && <p className="error"> Something went wrong.. </p>}
            <div className="landing__post">
               {data && data.getPostsByTag.map(post => {
                  return <BlogPost currentOffset={prevOffset ? +prevOffset : 0} currentLimit={5} key={post.id} post={post} />
               })}
            </div>
         </div>
      </div>
   )
}

export default Tags
