import { gql } from 'apollo-boost'

export default gql`
   query($query: String!) {
      getPostsBySearch(query: $query) {
         id
         content
         title,
         tags,
         created_at
      }
   }
`