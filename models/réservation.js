const mongoose = require("mongoose");
const client = require("./client");
const coiffeur = require("./coiffeur");

const réservationSchema = mongoose.Schema({
  datereserv: { type: Date, required: true, unique: true },
  optionreserv: { type: Object, required: true },
  clientname: { type: String, required: true },
  coiffeurName: { type: String, required: true }, // This should be a String, not ObjectId
});

module.exports = mongoose.model("Réservation", réservationSchema);
