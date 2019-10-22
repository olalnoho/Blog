import { gql } from 'apollo-boost'
export default gql`
   query($limit: Int, $offset: Int) {
      getPosts(limit: $limit offset: $offset) {
         id
         content
         title,
         tags,
         created_at
      }
   }
`