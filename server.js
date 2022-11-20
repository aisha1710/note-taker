const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
  let noteArray = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  req.body.id = noteArray.length.toString();
  noteArray.push(req.body);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteArray));
  res.json(noteArray);
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
