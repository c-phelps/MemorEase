// CJP Deck model (deckname!/[cards])
const { Schema, model } = require("mongoose");

const deckSchema = new Schema(
  {
    deckname: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  {
    // leaving the option open in case we want to use virtuals at some point
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Deck = model("Deck", deckSchema);

module.exports = Deck;
