import React from 'react'

const Tags = ({ tagQuery }) => {
   return (
      <div className="sidebar__tags">
         {tagQuery.error ? <h3 className="heading-4">Error getting the tags</h3> :
            <>
               <h3 className="heading-4">Most popular tags</h3>
               <ul className="sidebar__tags__list">
                  {!tagQuery.loading && tagQuery.data.getMostUsedTags.map(({ tag, count }) => {
                     return <li key={tag}>
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
