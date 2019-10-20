import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
const Search = props => {
   const history = useHistory()
   const [searchText, setSearchText] = useState('')
   return (
      <div className={`sidebar__search ${props.hidden && 'hidden'}`}>
         <h3 className="heading-4">Search for posts</h3>
         <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="sidebar__search--input"
         />
         <button
            onClick={e => {
               if (searchText) {
                  history.push({
                     pathname: `/search`,
                     search: `?query=${searchText}`,
                     state: { searchTerm: searchText }
                  })
                  setSearchText('')
               }
            }}
            className="btn sidebar__search--btn">Search</button>
      </div>
   )
}

export default Search