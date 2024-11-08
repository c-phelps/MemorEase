const { card1, card2, card3, deck } = require("./data.js");
const Deck = require("../models/Deck");
const Card = require("../models/Card");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require('../config/connection');

db.once('open', async () => {
  try {
    // clear DB
    await Card.deleteMany({});
    await Deck.deleteMany({});
    await User.deleteMany({});
    
    // hash the password before inserting
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password", saltRounds);

    const savedCard1 = await Card.create(card1);
    const savedCard2 = await Card.create(card2);
    const savedCard3 = await Card.create(card3);
    const cardIds = [savedCard1._id, savedCard2._id, savedCard3._id];
    // const cardObjectIds = cardIds.map(id => new mongoose.Types.ObjectId(id));  

    const deck = await Deck.create({
      deckname: "Test Deck",
      topic: "Test subject",
      cards: cardIds,
    });

    await User.create({
      username: "cphelps",
      email: "test@email.com",
      password: "password",
      decks: [deck._id],
    });

    console.log("Data seeding... success!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data;", err);
    process.exit(1);
  }
});

