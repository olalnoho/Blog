import React, { useState } from 'react'

export const AuthContext = React.createContext({
   isAuth: false,
   setIsAuth: () => { },
   user: {},
   setUser: () => { },
})

export default props => {
   const [authStatus, setAuthStatus] = useState(false)
   const [user, setUser] = useState({})
   return <AuthContext.Provider value={{
      isAuth: authStatus,
      setIsAuth: setAuthStatus,
      user,
      setUser
   }}>
      {props.children}
   </AuthContext.Provider>
}

