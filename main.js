const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { getotp, getcandidate } = require("./services/sharedmemory");
const credentials = require("./credentials");
const { File_Data } = require("./models");

const signuproutes = require("./routes/signup");
const loginroutes = require("./routes/login");

const { setsession } = require("./services/auth");
const cookieparser = require("cookie-parser");
const restrict_to_loggedin_candidates_only = require("./middlewares/restrict");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./user_upload");
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4();
    cb(null, uuid + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

app.get("/", (req, res) => {
  return res.render("landing");
});

app.use("/signup", signuproutes);
app.use("/login", loginroutes);

app.get("/upload", restrict_to_loggedin_candidates_only, (req, res) => {
  return res.render("upload");
});

app.post("/upload", upload.single("file_upload"), async (req, res) => {
  if (!req.file) {
    return res.render("failed");
  }
  try {
    const insert_records = await File_Data.create({
      filename: req.file.filename,
      orig_filename: req.file.originalname,
      size: req.file.size,
    });
    console.log("The records are:", insert_records);
    return res.render("success", { title: req.file.originalname });
  } catch (error) {
    console.error("Error:", error);
    return res.render("failed");
  }
});

app.get("/verify", (req, res) => {
  return res.render("verify");
});

app.post("/verify", (req, res) => {
   
  const {code} = req.body;
  const otp = getotp()
  const retriev_candidate = getcandidate()

  if (code === otp) {
    console.log("OTP Matched");

    const session_id = uuidv4();
    console.log("Session Id is generated : ", session_id);
    setsession(session_id, retriev_candidate);
    console.log("Session id successfully set");
    res.cookie("session_id", session_id);

    return res.redirect("/upload");
  } else {
    console.log("Incorrect OTP");
    return res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
