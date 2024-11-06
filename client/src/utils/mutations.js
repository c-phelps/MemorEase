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
      }
    }
  }
`;
