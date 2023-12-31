const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const bookmodel = mongoose.model("book", bookSchema);
module.exports = { bookmodel };
