const { getsession } = require("../services/auth");

async function restrict_to_loggedin_candidates_only(req, res, next) {
  const sessionid = req.cookies?.session_id;
  console.log("the session id parsed from cookie is : ", sessionid)
  
  if (!sessionid) {
    console.log("No Such session Found");
    return res.redirect("/login");
  }
  const candidate = getsession(sessionid);
  if (!candidate) {
    console.log("No Such Candidate Found for that session id");
    return res.redirect("/login");
  }

  req.candidate = candidate;
  next();
}
module.exports = restrict_to_loggedin_candidates_only;
