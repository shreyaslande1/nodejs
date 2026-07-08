const express = require("express");

const {
  handlegetallusers,
  getusersbyid,
  updateuserbyid,
  deleteuserbyid,
  handlecreatenewuser,
} = require("../controllers/user");

const router = express.Router();

// GET all users
// POST create new user
router
  .route("/")
  .get(handlegetallusers)
  .post(handlecreatenewuser);

// GET user by id
// PATCH update user
// DELETE user
router
  .route("/:id")
  .get(getusersbyid)
  .patch(updateuserbyid)
  .delete(deleteuserbyid);

module.exports = router;