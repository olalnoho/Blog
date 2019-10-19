import { gql } from 'apollo-boost'
export default gql`
   query {
      getMostUsedTags {
         count
         tag
      }
   }
`