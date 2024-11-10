import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_DECK = gql`
mutation CreateDeck($deckname: String!, $topic: String!) {
  createDeck(deckname: $deckname, topic: $topic) {
    _id
    deckname
    topic
  }
}
`

export const ADD_DECK_TO_USER = gql`mutation AddDeckToUser($userId: ID!, $deckId: ID!) {
  addDeckToUser(userId: $userId, deckId: $deckId) {
    _id
    decks {
      _id
    }
  }
}`

