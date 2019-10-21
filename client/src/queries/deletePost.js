import { gql } from 'apollo-boost'

export default gql`
   mutation($id: ID!) {
      deletePost(id: $id) {
         id
      }
   }
`