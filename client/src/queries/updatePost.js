import { gql } from 'apollo-boost'
export default gql`
   mutation($id: ID! $data: updatePostInput!) {
      updatePost(id: $id data: $data) {
         id
      }
   }
`