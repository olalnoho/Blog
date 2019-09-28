import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const Sidebar = ({ loading }) => {
   const { isAuth, setIsAuth, setUser, user } = useContext(AuthContext)
   const guestLinks = (
      <ul className="sidebar__nav">
         <li className="sidebar__nav--items"> <NavLink exact activeClassName="activelink" to="/">Home</NavLink></li>
         <li className="sidebar__nav--items"> <NavLink exact activeClassName="activelink" to="/register">Register</NavLink></li>
         <li className="sidebar__nav--items"> <NavLink exact activeClassName="activelink" to="/login">Login</NavLink></li>
      </ul>
   )
   const authLinks = (
      <ul className="sidebar__nav">
         <li className="sidebar__nav--items"> <NavLink activeClassName="activelink" exact to="/">Home</NavLink></li>
         <li className="sidebar__nav--items"> <button onClick={e => {
            localStorage.removeItem('token')
            localStorage.removeItem('isAuth')
            setIsAuth(false)
            setUser({})
         }}>Logout</button></li>
      </ul>
   )

   const authAdminLinks = (
      <ul className="sidebar__nav">
         <li className="sidebar__nav--items"> <NavLink activeClassName="activelink" exact to="/">Home</NavLink></li>
         <li className="sidebar__nav--items"> <NavLink activeClassName="activelink" exact to="/create">Create new post</NavLink></li>
         <li className="sidebar__nav--items"> <button onClick={e => {
            localStorage.removeItem('token')
            localStorage.removeItem('isAuth')
            setIsAuth(false)
            setUser({})
         }}>Logout</button></li>
      </ul>
   )
   if (loading) return <div className="sidebar" />
   return (
      <div className="sidebar">
         {isAuth ? user.role === 'admin' ? authAdminLinks : authLinks : guestLinks}
      </div>
   )
}

export default Sidebar
