import React, { useState } from 'react'
import getMostUsedTags from '../queries/popularTags'
import { useQuery } from '@apollo/react-hooks'
export const AuthContext = React.createContext({
   isAuth: false,
   setIsAuth: () => { },
   user: {},
   setUser: () => { },
   tagQuery: {}
})

export default props => {
   const { data, refetch, loading, error } = useQuery(getMostUsedTags)
   const [authStatus, setAuthStatus] = useState(false)
   const [user, setUser] = useState({})
   return <AuthContext.Provider value={{
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
   </AuthContext.Provider>
}

