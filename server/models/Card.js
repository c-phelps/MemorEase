// CJP Card model (question!/answer!/link)
const { Schema, model } = require("mongoose"); 
const cardSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: { 
        type: String, 
        required: true, 
        trim: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    link: { 
        type: String, 
        trim: true,
    },
  },
  {
    // leaving the option open in case we want to use virtuals at some point
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;
