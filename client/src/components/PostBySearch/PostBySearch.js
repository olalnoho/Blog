import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchPostQuery from '../../queries/searchPost'
import Spinner from '../UI/Spinner/Spinner'
import BlogPost from '../BlogPost/BlogPost'
import Modal from '../UI/Modal/Modal'
import EditBlogPost from '../EditBlogPost/EditBlogPost'
import useEditModal from '../../hooks/useEditModal'
const queryRegex = /\?\w+=(.+)/
const PostBySearch = props => {
   const queryExists = props.location.search.match(queryRegex)
   let q = ''
   if (queryExists) {
      q = decodeURI(queryExists[1])
   }
   const { selectedPost, setSelectedPost, showEditModal, setShowEditModal } = useEditModal()

   const openModal = useCallback(
      () => setShowEditModal(true),
      [setShowEditModal]
   )
   
   const { data, error, loading } = useQuery(SearchPostQuery, { variables: { query: q } })

   if (loading) {
      if (loading) return <div className="container">
         <Spinner />
      </div>
   }

   // The BlogPost component expects offset as a prop
   // so if a post is deleted, it can refetch the posts
   // on the page you were on, which is why we're getting it here.

   const prevOffset = localStorage.getItem('offset')

   return (
      <>
         <Modal show={showEditModal}>
            {selectedPost && <EditBlogPost where={'tags'} offset={+prevOffset} limit={5} post={selectedPost} closeModal={e => {
               setShowEditModal(false)
            }} />}
         </Modal>
         <div className="container column">
            <div className="landing">
               {error && error.graphQLErrors.length && <p className="error"> Something went wrong.. </p>}
               <div className="landing__post">
                  {data && data.getPostsBySearch.length ? data.getPostsBySearch.map(p => {
                     return <BlogPost
                        setSelectedPost={setSelectedPost}
                        openModal={openModal}
                        currentOffset={prevOffset ? +prevOffset : 0}
                        currentLimit={5}
                        key={p.id}
                        post={p}
                     />
                  }) :
                     <div className="error">
                        No results found for {q}
                     </div>}
               </div>
            </div>
         </div>
      </>
   )
}

export default PostBySearch
