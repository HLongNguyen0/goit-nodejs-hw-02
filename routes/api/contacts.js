const express = require("express");
const contactAPI = require("../../models/index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await contactAPI.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const oneContact = await contactAPI.getContactById(contactId);
  if (oneContact === null) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(oneContact);
});

router.post("/", async (req, res, next) => {
  const newContact = await contactAPI.addContact(req.body);
  res.json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contactAPI.removeContact(contactId);
  if (removedContact === null) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(removedContact);
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactAPI.updateContact(contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(updatedContact);
});

module.exports = router;
