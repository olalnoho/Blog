import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'
import { Redirect } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const createUserMutation = gql`
   mutation($username: String! $password: String!) {
      createUser(data: {
         username: $username,
         password: $password
      }) {
         token,
         user {
            username,
            id,
            role
         }
      }
   }
`

const Register = props => {
   const { setIsAuth, setUser, isAuth } = useContext(GlobalContext)
   const [formData, setFormData] = useState({ username: '', password: '', confirmedPassword: '' })
   const [createUser, { data, error }] = useMutation(createUserMutation)
   const [customError, setCustomError] = useState('')

   if (isAuth) {
      return <Redirect to="/" />
   }

   if (data) {
      props.refetch()
      localStorage.setItem('token', data.createUser.token)
      setIsAuth(true)
      setUser(data.createUser.user)
   }

   const onSubmit = e => {
      e.preventDefault()
      if (formData.password !== formData.confirmedPassword) {
         setCustomError('Passwords do not match')
         return
      }

      createUser({ variables: formData })
   }

   return (
      <div className="container">
         <div className="register">
            <h3 className="heading-3">
               Register
            </h3>
            {error && error.graphQLErrors.map(err => <p className="error" key={err.message}> {err.message} </p>)}
            {customError && <p className="error"> {customError} </p>}
            <form className="form" onSubmit={onSubmit}>
               <label htmlFor="username">Username</label>
               <input
                  autoComplete="off"
                  value={formData.username}
                  id="username"
                  required
                  type="text"
                  onChange={e => setFormData({ ...formData, username: e.target.value })} />
               <label htmlFor="password">Password</label>
               <input
                  value={formData.password}
                  id="password"
                  required
                  type="password"
                  onChange={e => setFormData({ ...formData, password: e.target.value })} />
               <label htmlFor="cpassword">Confirm password</label>
               <input
                  value={formData.confirmedPassword}
                  id="cpassword"
                  required
                  type="password"
                  onChange={e => setFormData({ ...formData, confirmedPassword: e.target.value })} />
               <input type="submit" value="Register" />
            </form>
         </div>
      </div>
   )
}

export default Register
