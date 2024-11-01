// create typeDefs and export them
const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        decks: [Deck]
    }

    type Deck {
        _id: ID
        deckname: String
        topic: String
        cards: [Card]
    }

    type Card {
        _id: ID
        question: String
        answer: String
        link: String
    }
    
    type Query {
        # decks
        decks: [Deck]

        # users
        users: [User]

        # single user by id
        userByID(id: ID!): User

        # array of decks by topic
        deckByTopic(topic: String!): [Deck]

        # single deck by id
        deckByID(id: ID!): Deck
    }
`;

module.exports = typeDefs;
