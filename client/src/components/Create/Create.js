import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const createPost = gql`
   mutation($title: String! $content: String!) {
      createPost(data: {
         title: $title,
         content: $content
      }) {
         id
      }
   }
`

const Create = (props) => {
   const [formData, setFormData] = useState({ title: '', content: '' })
   const [submitPost, { data}] = useMutation(createPost)

   const onSubmit = e => {
      e.preventDefault()
      submitPost({ variables: formData })
   }
   
   if (props.loading) {
      return <div className="container" />
   } else if (!props.data || (props.data && props.data.me.role !== 'admin')) {
      return <Redirect to="/" />
   }

   if (data) {
      return <Redirect to="/" />
   }
   return (
      <div className="container">
         <div className="create">
            <h3 className="heading-3">
               Create a new post
            </h3>
            <form className="form" onSubmit={onSubmit}>
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
               <input type="submit" value="Submit post" />
            </form>
         </div>
      </div>
   )
}

export default Create