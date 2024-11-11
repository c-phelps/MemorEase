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
`;

export const ADD_DECK_TO_USER = gql`
  mutation AddDeckToUser($userId: ID!, $deckId: ID!) {
    addDeckToUser(userId: $userId, deckId: $deckId) {
      _id
      decks {
        _id
      }
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCard($question: String!, $answer: String!, $link: String) {
    createCard(question: $question, answer: $answer, link: $link) {
      _id
      answer
      link
      question
    }
  }
`;

export const ADD_CARD_TO_DECK = gql`
  mutation AddCardToDeck($deckId: ID!, $cards: [String!]) {
    addCardToDeck(deckId: $deckId, cards: $cards) {
      deckname
      topic
      cards {
        answer
        question
      }
    }
  }
`;

export const EDIT_DECK = gql`
  mutation EditDeck($deckId: ID!, $deckname: String!, $topic: String!) {
    editDeck(deckId: $deckId, deckname: $deckname, topic: $topic) {
      _id
      deckname
      topic
      cards {
        _id
        question
        answer
        link
      }
      cardsCount
    }
  }
`;
export const DELETE_DECK = gql`
  mutation DeleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId)
  }
`;
