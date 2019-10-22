import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import { GlobalContext } from './context/GlobalContext'

import Landing from './components/Landing/Landing'
import Header from './components/UI/Header/Header'
import Sidebar from './components/UI/Sidebar/Sidebar'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Create from './components/Create/Create'
import FullPost from './components/FullPost/FullPost'
import Tags from './components/PostsByTags/PostsByTags';
import PostBySearch from './components/PostBySearch/PostBySearch';


const getUser = gql`
  query {
    me {
      username,
      id,
      role
    }
  }
`

function App() {
   const { setIsAuth, setUser } = useContext(GlobalContext)
   const { data, loading, refetch } = useQuery(getUser)

   useEffect(() => {
      if (data && data.me) {
         setIsAuth(true)
         setUser(data.me)
      }
   }, [setUser, setIsAuth, data])

   return <>
      <Header />
      <Sidebar loading={loading} />
      <Switch>
         <Route path="/" exact component={Landing} />
         <Route path="/login" exact component={(props) => <Login {...props} refetch={refetch} />} />
         <Route path="/register" exact component={props => <Register {...props} refetch={refetch} />} />
         <Route path="/create" exact component={props => <Create loading={loading} data={data} />} />
         <Route path="/post/:id" exact component={FullPost} />
         <Route path="/tags/:tag" exact component={Tags} />
         <Route path="/search" exact component={PostBySearch} />
      </Switch>
   </>
}

export default App;
