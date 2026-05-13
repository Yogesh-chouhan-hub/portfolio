const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8888;

/* ======================================================
                    MIDDLEWARE
====================================================== */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ======================================================
                    VIEW ENGINE
====================================================== */

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

/* ======================================================
                    STATIC FILES
====================================================== */

app.use(express.static(path.join(__dirname, "public")));

/* ======================================================
                    ROUTES
====================================================== */

/* HOME */

app.get("/", (req, res) => {
  res.redirect("/yogesh");
});

app.get("/yogesh", (req, res) => {
  res.render("front");
});

/* CONTACT FORM */

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log(name);
  console.log(email);
  console.log(message);

  res.send("Message Sent Successfully");
});

/* ======================================================
                    404 PAGE
====================================================== */

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

/* ======================================================
                    SERVER
====================================================== */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
