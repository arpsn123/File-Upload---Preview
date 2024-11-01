const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");

const signuproutes = require("./routes/signup");
const loginroutes = require("./routes/login");
const verifyroutes = require("./routes/verify");
const uploadroute = require("./routes/upload");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req, res) => {
  return res.render("landing");
});
app.use("/signup", signuproutes);
app.use("/login", loginroutes);
app.use("/verify", verifyroutes);
app.use("/upload", uploadroute);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
