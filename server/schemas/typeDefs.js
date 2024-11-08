// create typeDefs and export them
const typeDefs = `
    type User {
        _id: ID
        password: String
        username: String
        email: String
        decks: [Deck]
    }

    type Deck {
        _id: ID
        deckname: String
        topic: String
        cards: [Card]
        cardsCount: Int
    }

    type Card {
        _id: ID
        question: String
        answer: String
        link: String
    }
    
    type Auth {
        token: ID!
        user: User
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
        deckById(id: ID!): Deck
    }
    
    type Mutation {
        # add user
        addUser (username: String!, email: String!, password: String!): Auth

        # login user    
        login (username: String!, password: String!): Auth

        # create deck
        createDeck (deckname: String!, topic: String!): Deck

        # Add deck to user
        addDeckToUser (userId: ID!, deckId: ID!): User

        # Delete deck
        deleteDeck (deckId: ID!): Boolean

        # Rename deck
        renameDeck (deckId: ID!, newdeckname: String!): Deck
        
        # create card
        createCard (question: String!, answer: String!, link: String): Card

        # add card to deck
        addCardToDeck (deckId: ID!, cards: [String!]): Deck
    }

`;

module.exports = typeDefs;
