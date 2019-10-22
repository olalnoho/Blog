import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import Spinner from '../UI/Spinner/Spinner'

import { AuthContext } from '../../context/AuthContext'

import deletePostMutation from '../../queries/deletePost'
import numPosts from '../../queries/numPosts'
import getPosts from '../../queries/postQuery'
import popularTags from '../../queries/popularTags'
import getTagPosts from '../../queries/tagPosts'
import getSearchPosts from '../../queries/searchPost'

const BlogPost = React.memo(({ post, currentOffset, currentLimit }) => {
   const location = useLocation()
   const [deletePost, { loading }] = useMutation(deletePostMutation)
   const { user: { role } } = useContext(AuthContext)

   const time = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
   }).format(post.created_at)


   // If we are on the tag page i want to get the current tag
   // so i can refetch it after deletion
   let tag = null
   const isTag = location.pathname.match(/\/tags\/(.+)/)
   if (isTag) {
      tag = isTag[1]
   }

   // If we are on the search page i want to get the current search query
   // so i can refetch it after deletion
   let search = null
   if (location.pathname === '/search') {
      let isSearch = location.search.match(/\?query=(.+)/)
      if (isSearch) {
         search = isSearch[1]
      }
   }

   const onDeletePost = () => {
      deletePost({
         variables: { id: post.id },
         refetchQueries: () => {
            let queriesToRefetch = [
               { query: numPosts },
               { query: getPosts, variables: { offset: currentOffset, limit: currentLimit } },
               { query: popularTags }
            ]

            if (tag) {
               queriesToRefetch.push({ query: getTagPosts, variables: { tag } })
            }

            if (search) {
               queriesToRefetch.push({ query: getSearchPosts, variables: { query: search } })
            }

            return queriesToRefetch

         },
         awaitRefetchQueries: true
      })
   }

   if (loading) {
      return <div className="blogpost">
         <Spinner />
      </div>
   }

   return (
      <div className="blogpost">
         <div className="blogpost__heading">
            <Link to={`/post/${post.id}`} className="heading-3">{post.title} </Link>
            <div className="blogpost__heading--right">
               <strong>{time}</strong>
               {role === 'admin' && <i className="fas fa-edit"></i>}
               {role === 'admin' && <i className="fa fa-trash-alt"
                  onClick={onDeletePost}></i>}
            </div>
         </div>
         <div className="blogpost__content">
            {post.content}
         </div>
      </div>
   )
})

// (prevProps, nextProps) => {
//    return prevProps.post.id === nextProps.post.id
// }

export default BlogPost
