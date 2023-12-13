const express = require("express");
const router = express.Router();
const Client = require("../models/client"); // Assuming your model is in a file named "client.js"

// Create a new client
router.post("/", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a list of all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a client by ID
router.get("/:nom", async (req, res) => {
  try {
    const client = await Client.findOne({ nom: req.params.nom });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a client by ID
router.put("/:clientId", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.clientId,
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a client by ID
router.delete("/:clientId", async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.clientId);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
