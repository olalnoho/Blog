import React, { useState, useEffect } from 'react'
//import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
// import Card from '../UI/Card/Card'
import BlogPost from '../BlogPost/BlogPost'
import query from '../../queries/postQuery'
//const query = gql`
//   query($limit: Int, $offset: Int) {
//      getPosts(limit: $limit offset: $offset) {
//         count
//         posts {
//            id
//            content
//            title,
//            created_at
//         }
//      }
//   }
//`

const Landing = () => {
   const limit = 5;
   const [offset, setOffset] = useState(0)
   const [totalPosts, setTotalPosts] = useState(1)
   const { data, refetch, loading } = useQuery(query, { fetchPolicy: 'cache-first', variables: { limit, offset } })

   useEffect(() => {
      data && setTotalPosts(data.getPosts.count)
   }, [data])

   const paginate = (dir) => {
      if (dir === 'forwards') {
         refetch({ limit, offset: offset + limit })
         setOffset(limit + offset)
      } else if (dir === 'back') {
         refetch({ limit, offset: offset - limit })
         setOffset(offset - limit)
      }
   }

   if (loading) return <div className="container" />

   return (
      <div className="container column">
         <div className="landing">
            <div className="landing__post">
               {data && data.getPosts.posts.map(post => <BlogPost key={post.id} post={post} />)}
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
