import React from 'react'
import { useHistory } from 'react-router-dom'

const Tags = ({ tagQuery, ...props }) => {
   const history = useHistory()
   return (
      <div className={`sidebar__tags ${props.hidden ? 'smallScreenHidden' : ''}`}>
         {tagQuery.error ? <h3 className="heading-4">Error getting the tags</h3> :
            <>
               <h3 className="heading-4">Most popular tags</h3>
               <ul className="sidebar__tags__list">
                  {!tagQuery.loading && tagQuery.data.getMostUsedTags.map(({ tag, count }) => {
                     return <li
                        key={tag}
                        onClick={e => {
                           history.push({
                              pathname: `/tags/${tag}`,
                           })
                        }}>
                        <span> {tag} </span>
                        <span> {count} </span>
                     </li>
                  })}
               </ul>
            </>
         }
      </div>
   )
}

export default Tags
