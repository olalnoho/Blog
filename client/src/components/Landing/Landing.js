import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import BlogPost from '../BlogPost/BlogPost'
import query from '../../queries/postQuery'
import numQuery from '../../queries/numPosts'

const Landing = () => {
   const limit = 5;
   const [offset, setOffset] = useState(0)
   const { data: numData, error: numError } = useQuery(numQuery)
   const [totalPosts, setTotalPosts] = useState(1)
   const { data, error, refetch, loading } = useQuery(query, { fetchPolicy: 'cache-first', variables: { limit, offset } })
   useEffect(() => {
      numData && setTotalPosts(numData.numberOfPosts)
   }, [numData])

   const paginate = (dir) => {
      if (dir === 'forwards') {
         refetch({ limit, offset: offset + limit })
         setOffset(limit + offset)
      } else if (dir === 'back') {
         refetch({ limit, offset: offset - limit })
         setOffset(offset - limit)
      }

      window.scrollTo(0,0)
   }

   // if (loading) return <div className="container" />

   return (
      <div className="container column">
         <div className="landing">
            {error && error.graphQLErrors.map(err => <p className="error" key={err.message}> {err.message} </p>)}
            {numError && numError.graphQLErrors.map(err => <p className="error" key={err.message}> {err.message} </p>)}
            <div className="landing__post">
               {data && data.getPosts.map(post => <BlogPost key={post.id} post={post} />)}
            </div>
            <div className="landing__pagination">
               {offset > 0 ? <i className="fas fa-arrow-left" onClick={e => paginate('back')}></i> : <i></i>}
               <strong>Page {(offset / 5) + 1} of  {Math.ceil(totalPosts / limit)} </strong>
               {(offset + limit) < totalPosts ? <i className="fas fa-arrow-right" onClick={e => paginate('forwards')}></i> : <i></i>}
            </div>
         </div>
      </div>
   )
}

export default Landing
