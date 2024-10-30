const express = require("express");
const { Person } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sendOTP } = require("../services/generate_otp");
const { setotp, setcandidate } = require("../services/sharedmemory");

let dest_email = "";
let retriev_candidate = "";

router.get("/", (req, res) => {
  return res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const candidate = await Person.findOne({ where: { username: username } });
    // retriev_candidate = candidate;
    if (!candidate) {
      console.log("No Such User Present");
      return res.redirect("/login");
    }
    console.log("The User Found : ", candidate);
    dest_email = candidate.email;
    bcrypt.compare(password, candidate.password, (err, result) => {
      if (err) {
        console.log("Incorrect Password !!", err);
        return res.redirect("/login");
      }
      if (result) {
        console.log("Password Matched");

        let randomstring = "";
        randomstring = Math.random().toString(36).slice(-8);
        try {
          sendOTP(dest_email, randomstring);
          console.log(`OTP is Sent in ${dest_email} is : ${randomstring}`);
          setotp(randomstring);
          setcandidate(candidate);
          return res.redirect("verify");
        } catch (error) {
          console.log("Error Generating OTP", error);
          return res.redirect("login");
        }
      } else {
        console.log("Incorrect Password !!", err);
        return res.redirect("/login");
      }
    });
  } catch (error) {
    console.log("Error in Parsing information from form", error);
    return res.redirect("login");
  }
});

module.exports = router;