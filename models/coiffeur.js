const mongoose = require("mongoose");

const coiffeurSchema = mongoose.Schema({
  nomcoiff: { type: String, required: true },
  //telcoiff: { type: Number, required: true, unique: true },
  motdepassecoiff: { type: String, required: true },
  lieuxcoiff: { type: String, required: true },
  prix: { type: Object, required: true },
});

module.exports = mongoose.model("Coiffeur", coiffeurSchema);
