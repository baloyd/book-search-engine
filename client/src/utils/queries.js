import { gql } from '@apollo/client';




export const GET_USERS = gql`
query users {
     _id
     username
     email
     password
     bookCount
     savedBooks{
        authors
        description
        bookId
        image
        link
        title
     }
}
`

export const GET_SINGLE_USER = gql`
query getSingleUser ($_id: ID!) {
    user(_id: $_id) {
        _id
        username
     email
     password
     bookCount
     savedBooks{
        authors
        description
        bookId
        image
        link
        title
     }
   }
}
`
