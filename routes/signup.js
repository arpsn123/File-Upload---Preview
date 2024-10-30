const express = require("express");
const bcrypt = require("bcrypt");
const { Person } = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("signup");
});

router.post("/", (req, res) => {
  const { fullname, username, email, password, mobileno } = req.body;
  try {
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (error, hashedpassword) => {
      if (error) {
        console.log("error generating the hashing : ", error);
        return res.redirect("/signup");
      }
      console.log(
        "hasing done correctly, the hashed password : ",
        hashedpassword
      );
      try {
        const user_reg_details = await Person.create({
          fullname: fullname,
          username: username,
          email: email,
          password: hashedpassword,
          mobileno: mobileno,
        });
        console.log("Successfully Entered Registration Data in db");
        return res.redirect("/login");
      } catch (error) {
        console.log("error in inserting reg. data in db : ", error);
        return res.redirect("/signup");
      }
    });
  } catch (error) {
    console.log("error for signup or hashing the password : ", error);
    return res.redirect("/signup");
  }
});

module.exports = router;
