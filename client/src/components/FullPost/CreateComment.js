import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GlobalContext } from '../../context/GlobalContext'
import createCommentMutation from '../../queries/createComment'
import Spinner from '../UI/Spinner/Spinner'

const CreateComment = ({ postId, query }) => {
   const { isAuth } = useContext(GlobalContext)
   const [formData, setFormData] = useState({
      name: '',
      content: ''
   })
   const [submitComment, { error, loading }] = useMutation(createCommentMutation)

   const onSubmit = e => {
      e.preventDefault()
      const data = {}
      data.content = formData.content
      if (formData.name && !isAuth) {
         data.name = formData.name
      }

      submitComment({
         variables: { postId, data }, refetchQueries: () => {
            return [{ query, variables: { id: postId } }]
         }, awaitRefetchQueries: true
      }).then(_ => {
         setFormData({...formData, content: ''})
      })
   }

   if (loading) {
      return <Spinner />
   }
   return (
      <>
         {error && error.graphQLErrors.length && <p style={{ textAlign: 'center' }} className="error"> Something went wrong, try again! </p>}
         <form className="form" onSubmit={onSubmit}>
            <input
               value={formData.content}
               required
               onChange={e => setFormData({ ...formData, content: e.target.value })}
               placeholder="Comment on the post"
               type="text" />
            {!isAuth && <input
               value={formData.name}
               required
               onChange={e => setFormData({ ...formData, name: e.target.value })}
               placeholder="Your name" type="text" />}
            <input type="submit" />
         </form>
      </>
   )
}

export default CreateComment
