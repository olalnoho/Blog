import React, { useCallback } from 'react'
import BlogPost from '../BlogPost/BlogPost'
import { useQuery } from '@apollo/react-hooks'
import tagQuery from '../../queries/tagPosts'
import Spinner from '../UI/Spinner/Spinner'
import Modal from '../UI/Modal/Modal'
import EditBlogPost from '../EditBlogPost/EditBlogPost'
import useEditModal from '../../hooks/useEditModal'
const Tags = props => {
   const currentTag = props.match.params.tag
   const { data, loading, error } = useQuery(tagQuery, { variables: { tag: currentTag }, fetchPolicy: 'network-only' })
   const { selectedPost, setSelectedPost, showEditModal, setShowEditModal } = useEditModal()
   const openModal = useCallback(
      () => setShowEditModal(true),
      [setShowEditModal]
   )
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
                  {data && data.getPostsByTag.map(post => {
                     return <BlogPost
                        openModal={openModal}
                        currentOffset={prevOffset ? +prevOffset : 0}
                        currentLimit={5}
                        key={post.id}
                        post={post}
                        setSelectedPost={setSelectedPost} />
                  })}
               </div>
            </div>
         </div>
      </>
   )
}

export default Tags
