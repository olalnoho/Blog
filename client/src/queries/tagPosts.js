import { gql } from 'apollo-boost'
export default gql`
   query($tag: String!) {
         getPostsByTag(tag: $tag) {
            id
            content
            title,
            tags,
            created_at
      }
   }
`