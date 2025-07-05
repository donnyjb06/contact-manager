const router = require("express").Router();
const { getAllContacts, getContact, deleteContact, updateContact, postNewContact } = require("../controllers/contact.controller")

router.route("/")
  .get(getAllContacts)
  .post(postNewContact)

  router.route('/:id')
  .get(getContact)
  .delete(deleteContact)
  .patch(updateContact)

module.exports = router;