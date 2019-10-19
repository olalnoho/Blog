import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
const Search = props => {
   const history = useHistory()
   const [searchText, setSearchText] = useState('')
   return (
      <div className="sidebar__search">
         <h3 className="heading-4">Search for posts</h3>
         <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="sidebar__search--input"
            />
         <button
            onClick={e => {
               history.push({
                  pathname: `/`,
                  search: `?query=${searchText}`,
                  state: { searchTerm: searchText }
               })
            }}
            className="btn sidebar__search--btn">Search</button>
      </div>
   )
}

export default Search