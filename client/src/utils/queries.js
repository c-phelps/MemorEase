import { gql } from '@apollo/client';

export const QUERY_DECKS = gql`
  query getDecks {
    decks {
      _id
      deckname
      topic
      cards {}
    }
  }
`;

