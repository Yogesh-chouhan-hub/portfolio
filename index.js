const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Contact = require("./models/contactSchema");
require("dotenv").config();
const PORT = process.env.PORT || 8888;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
  res.redirect("/yogesh");
});

app.get("/yogesh", (req, res) => {
  res.render("front");
});

/* CONTACT FORM */
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    let newMsg = new Contact({
      name: name,
      email: email,
      message: message,
    });
    await newMsg.save();
    res.redirect("/yogesh");
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
