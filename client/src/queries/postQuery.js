import { gql } from 'apollo-boost'
export default gql`
   query($limit: Int, $offset: Int) {
      getPosts(limit: $limit offset: $offset) {
         count
         posts {
            id
            content
            title,
            created_at
         }
      }
   }
`