import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updatePostMutation from '../../queries/updatePost'
import getPosts from '../../queries/postQuery'
import Spinner from '../UI/Spinner/Spinner'
const EditBlogPost = ({ post, offset, limit, closeModal }) => {
   const [sendUpdate, { loading }] = useMutation(updatePostMutation)
   const [formData, setFormData] = useState({
      title: post.title,
      content: post.content
   })

   const onSubmit = e => {
      e.preventDefault()
      sendUpdate({
         variables: { id: post.id, data: formData }, refetchQueries: () => [
            { query: getPosts, variables: { offset, limit } }
         ], awaitRefetchQueries: true
      }).then(_ => closeModal())
   }

   if (loading) {
      return <div className="editblogpost">
         <Spinner />
      </div>
   }

   return (
      <div className="editblogpost">
         <div className="editblogpost__heading">
            <h3 className="heading-3">Update your post</h3>
         <i className="fas fa-times" onClick={closeModal}/>
         </div>
         <form className="form" onSubmit={onSubmit}>
            <label>
               Set a new title:
            </label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            <label>Update the text:</label>
            <textarea
               value={formData.content}
               placeholder="Text goes here"
               onChange={e => setFormData({ ...formData, content: e.target.value })} />
            <input type="submit" value="Submit" />
         </form>
      </div>
   )
}

export default EditBlogPost
