const express = require("express");
const router = express.Router();
const Coiffeur = require("../models/coiffeur");

router.get("/", async (req, res) => {
  try {
    const coiff = await Coiffeur.find();
    res.status(200).json(coiff);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// créer un nouvelle catégorie
router.post("/", async (req, res) => {
  const { nomcoiff, telcoiff, motdepassecoiff, lieuxcoiff, prix } = req.body;
  const newCoiffeur = new Coiffeur({
    nomcoiff: nomcoiff,
    motdepassecoiff: motdepassecoiff,
    telcoiff: telcoiff,
    lieuxcoiff: lieuxcoiff,
    prix: prix,
  });
  try {
    await newCoiffeur.save();
    res.status(200).json(newCoiffeur);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// chercher une catégorie
router.get("/:nomcoiff", async (req, res) => {
  try {
    const coiff = await Coiffeur.findOne({ nomcoiff: req.params.nomcoiff });
    res.status(200).json(coiff);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// modifier une catégorie
router.put("/:coiffeurId", async (req, res) => {
  const { nomcoiff, telcoiff, lieuxcoiff, prix } = req.body;
  const id = req.params.coiffeurId;
  try {
    const coiff1 = {
      nomcoiff: nomcoiff,
      telcoiff: telcoiff,
      lieuxcoiff: lieuxcoiff,
      prix: prix,
      _id: id,
    };
    console.log(coiff1);
    await Coiffeur.findByIdAndUpdate(id, coiff1);
    res.json(coiff1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer une catégorie
router.delete("/:coiffeurId", async (req, res) => {
  const id = req.params.coiffeurId;
  await Coiffeur.findByIdAndDelete(id);
  res.json({ message: "coiffeur deleted successfully." });
});
module.exports = router;
