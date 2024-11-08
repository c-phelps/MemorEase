<<<<<<< HEAD
import { gql } from '@apollo/client';

export const ADD_DECK = gql`
  mutation AddDeck($userId: ID!, $deckId: ID!) {
    addDeck(userId: $userId, deckId: $deckId) {
      _id
      username
      email
      decks {
        _id
        deckname
        topic
=======
import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
      }
    }
  }
`;
<<<<<<< HEAD
=======

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

>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
