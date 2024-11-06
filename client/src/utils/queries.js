import { gql } from "@apollo/client";

export const QUERY_GET_DECKS_BY_TOPIC = gql`
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
