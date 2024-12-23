const express = require("express");
const { Person } = require("../models");
const restrict_to_loggedin_candidates_only = require("../middlewares/restrict")
const router = express.Router();

router.get("/", restrict_to_loggedin_candidates_only, async (req, res) => {
  try {
    const reg_users = await Person.findAll();
    console.log("All The Users : ", JSON.stringify(reg_users));
    return res.render("user_details", { reg_users: reg_users });
  } catch (error) {
    console.log("Error Retrieving Members Details or NO USER REGISTERED YET");
    return res.render("user_details", { reg_users: [] });
  }
});
module.exports = router;
