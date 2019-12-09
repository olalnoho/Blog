import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import useEditModal from '../../hooks/useEditModal'
import BlogPost from '../BlogPost/BlogPost'
import getPostsQuery from '../../queries/postQuery'
import numQuery from '../../queries/numPosts'
import Spinner from '../UI/Spinner/Spinner'
import Modal from '../UI/Modal/Modal'
import EditBlogPost from '../EditBlogPost/EditBlogPost'

const Landing = () => {
   const limit = 5;
   const [offset, setOffset] = useState(0)
   const { data: numData, error: numError } = useQuery(numQuery)
   const [totalPosts, setTotalPosts] = useState(1)
   const { data, error, refetch, loading } = useQuery(getPostsQuery, { fetchPolicy: 'cache-first', variables: { limit, offset } })

   const {
      showEditModal,
      setShowEditModal,
      selectedPost,
      setSelectedPost
   } = useEditModal()

   useEffect(() => {
      numData && setTotalPosts(numData.numberOfPosts)
   }, [numData])

   useEffect(() => {
      let offset = localStorage.getItem('offset')
      if (offset) {
         setOffset(+offset)
      }
   }, [])

   const paginate = dir => {
      if (dir === 'forwards') {
         refetch({ limit, offset: offset + limit })
         setOffset(offset => {
            localStorage.setItem('offset', limit + offset)
            return limit + offset
         })
      } else if (dir === 'back') {
         refetch({ limit, offset: offset - limit })
         setOffset(offset => {
            localStorage.setItem('offset', offset - limit)
            return offset - limit
         })
      }

      //window.scrollTo(0,0)
   }

   const openModal = useCallback(
      () => setShowEditModal(true),
      [setShowEditModal]
   )

   if (loading) return <div className="container">
      <Spinner />
   </div>

   return (
      <>
         <Modal show={showEditModal}>
            {selectedPost && <EditBlogPost offset={offset} limit={limit} post={selectedPost} closeModal={e => {
               setShowEditModal(false)
            }} />}
         </Modal>
         <div className="container column" onClick={e => setShowEditModal(false)}>
            <div className="landing">
               {
                  ((error && error.graphQLErrors.length > 0) ||
                  (numError && numError.graphQLErrors.length > 0)) &&
                  <p className="error">Something went wrong...</p>
               }
               <div className="landing__post">
                  {data && data.getPosts.map(post => <BlogPost
                     openModal={openModal}
                     currentOffset={offset}
                     currentLimit={limit}
                     key={post.id}
                     post={post}
                     setSelectedPost={setSelectedPost} />)}
               </div>
               {totalPosts > limit &&
                  <div className="landing__pagination">
                     {offset > 0 ? <i className="fas fa-arrow-left" onClick={e => paginate('back')}></i> : <i></i>}

                     <strong>Page {(offset / 5) + 1} of  {Math.ceil(totalPosts / limit)} </strong>

                     {(offset + limit) < totalPosts ? <i className="fas fa-arrow-right" onClick={e => paginate('forwards')}></i> : <i></i>}
                  </div>
               }
            </div>
         </div>
      </>
   )
}

export default Landing
