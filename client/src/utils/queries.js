import { gql } from "@apollo/client";

export const DECKS_BY_TOPIC = gql`
  query deckByTopic($topic: String!) {
    deckByTopic(topic: $topic) {
      _id
      deckname
      topic
      cards {
        _id
        question
        answer
        link
      }
    }
  }
`;

export const DECKS_BY_USER = gql`
  query decksByUserID($userByIdId: ID!) {
  userByID(id: $userByIdId) {
    _id
    username
    decks {
      _id
      deckname
      topic
    }
  }
}
`;
