import React, { useState } from 'react'
import getMostUsedTags from '../queries/popularTags'
import { useQuery } from '@apollo/react-hooks'
export const GlobalContext = React.createContext({
   isAuth: false,
   setIsAuth: () => { },
   user: {},
   setUser: () => { },
   tagQuery: {}
})

export default props => {
   // useQuery is placed here so i get access
   // to refetch in other components.
   // like Create, after submitting new post.

   const { data, refetch, loading, error } = useQuery(getMostUsedTags)
   const [authStatus, setAuthStatus] = useState(false)
   const [user, setUser] = useState({})
   return <GlobalContext.Provider value={{
      isAuth: authStatus,
      setIsAuth: setAuthStatus,
      user,
      setUser,
      tagQuery: {
         data,
         refetch,
         loading,
         error
      }
   }}>
      {props.children}
   </GlobalContext.Provider>
}

