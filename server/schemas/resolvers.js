// set up resolvers and export them
const Deck = require("../models/Deck");
const User = require("../models/User");
const Card = require("../models/Card");
// call auth middleware
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    decks: async () => {
      try {
        const deck = await Deck.find({}).populate('cards');
        return deck;
      } catch (err) {
        console.error(err);
        throw new Error('Issue fetching Decks.');
      }
    },
    users: async () => {
      try {
        const users = await User.find({}).populate({
          path: 'decks',
          populate: {
            path: 'cards',
            model: 'Card',
          },
        });
        return users;
      } catch (err) {
        console.error(err);
        throw new Error('Issue fetching Users.');
      }
    },
    userByID: async (parent, { id }) => {
      try {
        const user = await User.findById(id).populate('decks');
        return user;
      } catch (err) {
        console.error(err);
        throw new Error('Issue fetching User by ID.');
      }
    },
    deckByTopic: async (parent, { topic }) => {
      try {
        // return deck by topic populate cards field
        const deck = await Deck.find({ topic: topic }).populate('cards');
        return deck;
      } catch (err) {
        console.error(err);
        throw new Error('Issue fetching Decks by topic.');
      }
    },
    deckById: async (parent, { id }) => {
      try {
        const deck = await Deck.findById(id).populate('cards');
        return deck;
      } catch (err) {
        console.error(err);
        throw new Error('Issue fetching Deck by ID.');
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error('Issue adding new user.');
      }
    },
    login: async (parent, { username, password }) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw new Error('Username not found.');
        }

        const isValidPassword = await user.isCorrectPassword(password);
        if (!isValidPassword) {
          throw new Error('Incorrect username or password');
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error('Issue logging in.');
      }
    },
    // Resolver for creating a new deck
    createDeck: async (parent, { input }) => {
      try {
        const createDeck = new Deck({
          deckname: input.deckname,
          topic: input.topic,
          cards: [],
        });

        await createDeck.save();
        return createDeck;
      } catch (error) {
        throw new Error('Error creating deck: ' + error.message);
      }
    },

    // Resolver for adding a deck to a user
    addDeckToUser: async (_, { userId, deckId }) => {
      try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Add the deck ID to the user's decks array
        if (!user.decks.includes(deckId)) {
          user.decks.push(deckId);
          await user.save();
        }

        return user;
      } catch (error) {
        throw new Error('Error adding deck to user: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
