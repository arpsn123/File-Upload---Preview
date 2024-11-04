const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { getotp, getcandidate, getotpjob } = require("../services/sharedmemory");
const { setsession } = require("../services/auth");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("verify");
});
router.post("/", (req, res) => {
  const { code } = req.body;
  const otp = getotp();
  const retriev_candidate = getcandidate();

  if (code === otp) {
    console.log("OTP Matched");
    const otpjob = getotpjob();
    console.log("Stopping The Scheduler");
    if (otpjob) {
      otpjob.stop();
    }

    const session_id = uuidv4();
    console.log("Session Id is generated : ", session_id);
    setsession(session_id, retriev_candidate);
    console.log("Session id successfully set");
    res.cookie("session_id", session_id);

    return res.redirect("/upload");
  } else {
    console.log("Incorrect OTP");
    return res.redirect("/verify");
  }
});

module.exports = router;
