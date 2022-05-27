const express = require("express");
const db = require("../database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../public/dist"));

app.get("/api/debts", (req, res) => {
  db.getAllDebts((err, results) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(results);
    }
  })
});


app.post("/api/debts", (req, res) => {
  db.postDebt(req.body, (err, results) => {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(201).send("success");
    }
  })
});

app.delete("/api/debts", (req, res) => {
  db.unpostDebt((err, results) => {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(201).send("deleted");
    }
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
