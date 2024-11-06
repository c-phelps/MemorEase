// set up resolvers and export them
const Deck = require("../models/Deck");
const User = require("../models/User");
const Card = require("../models/Card");

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
    deckByID: async (parent, { id }) => {
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
    
  },
};

module.exports = resolvers;
