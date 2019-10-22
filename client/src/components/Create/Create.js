import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GlobalContext } from '../../context/GlobalContext'
import postQuery from '../../queries/postQuery'
import numQuery from '../../queries/numPosts'
import Spinner from '../UI/Spinner/Spinner'
const createPost = gql`
   mutation($title: String! $content: String! $tags: [String!]) {
      createPost(data: {
         title: $title,
         content: $content,
         tags: $tags
      }) {
         id
      }
   }
`

const Create = (props) => {
   const { tagQuery } = useContext(GlobalContext)
   const [formData, setFormData] = useState({ title: '', content: '', tags: [] })
   const [tags, setTags] = useState('')
   const [submitPost, { data, loading }] = useMutation(createPost)

   const onSubmit = e => {
      e.preventDefault()
      submitPost({
         variables: formData, refetchQueries: () => {
            return [{ query: postQuery, variables: { limit: 5, offset: 0 }, }, { query: numQuery }]
         }, awaitRefetchQueries: true
      }).then(_ => tagQuery.refetch())
   }

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

   console.log(data)

   if (props.loading) {
      return <div className="container" />
   } else if (!props.data || (props.data && props.data.me.role !== 'admin')) {
      return <Redirect to="/" />
   }

   if (data) {
      return <Redirect to="/" />
   }

   if (loading) return <div className="container">
      <Spinner />
   </div>

   return (
      <div className="container">
         <div className="create">
            <h3 className="heading-3">
               Create a new post
            </h3>
            {/* I made this a div -- instead of form -- so i can use enter for tag submit */}
            <div className="form">
               <input
                  value={formData.title}
                  autoComplete="off"
                  type="text"
                  id="title"
                  placeholder="Title your post..."
                  onChange={e => setFormData({ ...formData, title: e.target.value })} />
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
               <input type="submit" value="Create new post!" onClick={onSubmit} />
            </div>
         </div>
      </div>
   )
}

export default Create