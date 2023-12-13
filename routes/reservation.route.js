const express = require("express");
const router = express.Router();
const Reservation = require("../models/réservation");

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new reservation
router.post("/", async (req, res) => {
  const {
    datereserv,
    optionreserv,
    clientID,
    coiffeurID,
    coiffeurName,
    clientname,
  } = req.body;
  const newReservation = new Reservation({
    datereserv: datereserv,
    optionreserv: optionreserv,
    clientID: clientID,
    clientname: clientname,
    coiffeurID: coiffeurID,
    coiffeurName: coiffeurName,
  });

  try {
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single reservation by ID
router.get("/:reservationId", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a reservation by ID
router.put("/:reservationId", async (req, res) => {
  const { datereserv, optionreserv, clientID, coiffeurID } = req.body;
  const id = req.params.reservationId;

  try {
    const updatedReservation = {
      datereserv: datereserv,
      optionreserv: optionreserv,
      clientID: clientID,
      coiffeurID: coiffeurID,
    };

    await Reservation.findByIdAndUpdate(id, updatedReservation);
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Delete a reservation by ID
router.delete("/:reservationId", async (req, res) => {
  const id = req.params.reservationId;
  await Reservation.findByIdAndDelete(id);
  res.json({ message: "Reservation deleted successfully." });
});
router.get("/byCoiffeur/:coiffeurName", async (req, res) => {
  try {
    const reservations = await Reservation.find({
      coiffeurName: req.params.coiffeurName,
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/byclient/:clientname", async (req, res) => {
  try {
    const reservations = await Reservation.find({
      clientname: req.params.clientname,
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
