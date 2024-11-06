// CJP User model (username!/email!/password!/[decks])
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    decks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deck",
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

const User = model("User", userSchema);

module.exports = User;
