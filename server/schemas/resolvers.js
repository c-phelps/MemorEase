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
<<<<<<< HEAD
            path: 'cards',
            model: 'Card',
=======
            path: "cards",
            model: "Card",
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
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
<<<<<<< HEAD
    addDeck: async (parent, { userId, deckId }) => { 
      try {
        return User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { decks: deckId } }, 
          { new: true, runValidators: true}
        )
      } catch (err) {
        console.error(err);
        throw new Error('Issue adding deck.');
      }
    },
    
=======
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error("Issue adding new user.");
      }
    },
    login: async (parent, { username, password }) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw new Error("Username not found.");
        }

        const isValidPassword = await user.isCorrectPassword(password);
        if (!isValidPassword) {
          throw new Error("Incorrect username or password");
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error("Issue logging in.");
      }
    },
    // Resolver for creating a new deck
    createDeck: async (parent, { deckname, topic }) => {
      try {
        const createDeck = new Deck({
          deckname: deckname,
          topic: topic,
          cards: [],
        });

        await createDeck.save();
        return createDeck;
      } catch (error) {
        throw new Error("Error creating deck: " + error.message);
      }
    },

    // Resolver for adding a deck to a user
    addDeckToUser: async (_, { userId, deckId }) => {
      try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Add the deck ID to the user's decks array
        if (!user.decks.includes(deckId)) {
          user.decks.push(deckId);
          await user.save();
        }

        return user;
      } catch (error) {
        throw new Error("Error adding deck to user: " + error.message);
      }
    },
    // Resolver for deleting a deck
    deleteDeck: async (parent, { deckId }) => {
      try {
        const result = await Deck.findByIdAndDelete(deckId);
        return result ? true : false;
      } catch (error) {
        throw new Error("Error deleting deck: " + error.message);
      }
    },

    // Resolver for renaming a deck
    renameDeck: async (parent, { deckId, newdeckname }) => {
      try {
        const renameDeck = await Deck.findByIdAndUpdate(deckId, { deckname: newdeckname });
        if (!renameDeck) {
          throw new Error("Deck not found");
        }
        return renameDeck;
      } catch (error) {
        throw new Error("Error renaming deck: " + error.message);
      }
    },
>>>>>>> a4c0fefac46eb081acb5699ac078ceea6897c454
  },
};

module.exports = resolvers;
