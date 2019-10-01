import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import postQuery from '../../queries/postQuery'
import numQuery from '../../queries/numPosts'
import Spinner from '../UI/Spinner/Spinner'
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
   const [submitPost, { data, loading }] = useMutation(createPost)

   const onSubmit = e => {
      e.preventDefault()
      submitPost({
         variables: formData, refetchQueries: () => {
            return [{ query: postQuery, variables: { limit: 5, offset: 0 }, }, { query: numQuery }]
         }, awaitRefetchQueries: true
      })
   }

   if (props.loading) {
      return <div className="container" />
   } else if (!props.data || (props.data && props.data.me.role !== 'admin')) {
      return <Redirect to="/" />
   }

   if (data) {
      return <Redirect to="/" />
   }

   if(loading) return <div className="container">
      <Spinner/>
   </div>
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