import { gql } from 'apollo-boost'

export default gql`
   mutation($postId: ID! $data: createCommentInput!) {
      createComment(postId: $postId, data: $data) {
         id
      }
    }
`