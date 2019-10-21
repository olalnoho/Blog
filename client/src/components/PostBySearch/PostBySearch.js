import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchPostQuery from '../../queries/searchPost'
import Spinner from '../UI/Spinner/Spinner'
import BlogPost from '../BlogPost/BlogPost'
const queryRegex = /\?\w+=(.+)/
const PostBySearch = props => {
   const q = decodeURI(props.location.search.match(queryRegex)[1])
   const { data, error, loading } = useQuery(SearchPostQuery, { variables: { query: q } })

   if (loading) {
      if (loading) return <div className="container">
         <Spinner />
      </div>
   }
   return (
      <div className="container column">
         <div className="landing">
         {error && error.graphQLErrors.length && <p className="error"> Something went wrong.. </p>}
            <div className="landing__post">
               {data && data.getPostsBySearch.length ? data.getPostsBySearch.map(p => {
                  return <BlogPost key={p.id} post={p} />
               }) :
                  <div className="error">
                     No results found for {q}
                  </div>}
            </div>
         </div>
      </div>
   )
}

export default PostBySearch
