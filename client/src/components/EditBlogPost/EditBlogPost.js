import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updatePostMutation from '../../queries/updatePost'
import getPosts from '../../queries/postQuery'
import popularTags from '../../queries/popularTags'
import Spinner from '../UI/Spinner/Spinner'
const EditBlogPost = ({ post, offset, limit, closeModal }) => {
   const [sendUpdate, { loading }] = useMutation(updatePostMutation)
   const [tags, setTags] = useState('')
   const [formData, setFormData] = useState({
      title: post.title,
      content: post.content,
      tags: post.tags ? post.tags : []
   })

   const tagInput = e => {
      if (e.key === 'Enter') {
         setFormData({ ...formData, tags: [...formData.tags, tags] })
         setTags('')
      }
   }

   const deleteTag = i => {
      const tagsArray = formData.tags.slice()
      tagsArray.splice(i, 1)
      setFormData({ ...formData, tags: tagsArray })
   }

   const onSubmit = e => {
      e.preventDefault()
      sendUpdate({
         variables: { id: post.id, data: formData }, refetchQueries: () => [
            { query: getPosts, variables: { offset, limit }, },
            { query: popularTags }
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
            <i className="fas fa-times" onClick={closeModal} />
         </div>
         <div className="form">
            <label>
               Set a new title:
            </label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
            <label>Update the text:</label>
            <textarea
               value={formData.content}
               placeholder="Text goes here"
               onChange={e => setFormData({ ...formData, content: e.target.value })} />
            <div className="tag-holder">
               <span className="labelfortags"> Your tags: </span>
               {formData.tags.map((t, i) => <span
                  key={i}
                  className="tag"
               > {t} <span onClick={e => deleteTag(i)} className="remove-tag"></span> </span>)}
            </div>
            <input
               type="text"
               value={tags}
               placeholder="Tags. Press enter to add them."
               onChange={e => setTags(e.target.value)}
               onKeyUp={tagInput}
            />
            <input onClick={onSubmit} type="submit" value="Submit" />
         </div>
      </div>
   )
}

export default EditBlogPost
