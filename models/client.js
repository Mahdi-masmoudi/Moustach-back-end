const mongoose = require("mongoose");
const coiffeur = require("./coiffeur");
const clientSchema = mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  tel: { type: Number, required: true, unique: true },
  motdepasse: { type: String, required: true },
  coiffeurID: { type: mongoose.Schema.Types.ObjectId, ref: coiffeur },
});
module.exports = mongoose.model("Client", clientSchema);
