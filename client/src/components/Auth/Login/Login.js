import React, { useState, useContext } from 'react'
import { gql } from 'apollo-boost'
import { Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { GlobalContext } from '../../../context/GlobalContext'

const loginMutation = gql`
   mutation($username: String! $password: String!) {
      login(data: {
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
const Login = (props) => {
   const authContext = useContext(GlobalContext)
   const [formData, setFormData] = useState({ username: '', password: '' })
   const [login, { data, error }] = useMutation(loginMutation)
   const onSubmit = e => {
      e.preventDefault()
      login({ variables: formData })
   }

   if (authContext.isAuth) {
      return <Redirect to="/" />
   }

   if (data) {
      props.refetch()
      localStorage.setItem('token', data.login.token)
      localStorage.setItem('isAuth', true)
      authContext.setIsAuth(true)
      authContext.setUser(data.login.user)
      return <Redirect to="/" />
   }

   return (
      <div className="container">
         <div className="login">
            {error && error.graphQLErrors.map(err => <p className="error" key={err.message}> {err.message} </p>)}
            <h3 className="heading-3">
               Login
         </h3>
            <form className="form" onSubmit={onSubmit}>
               <label htmlFor="username">Username</label>
               <input
                  value={formData.username}
                  id="username"
                  required
                  type="text"
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  autoComplete="off" />
               <label htmlFor="password">Password</label>
               <input
                  value={formData.password}
                  id="password"
                  required
                  type="password"
                  onChange={e => setFormData({ ...formData, password: e.target.value })} />
               <input type="submit" value="Login" />
            </form>
         </div>
      </div>
   )
}

export default Login
