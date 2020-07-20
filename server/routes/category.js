const express = require("express");
const { Category } = require("../models/category");

const router = express.Router();

router.get("/", (req, res) => {
  Category.find((err, cats) => {
    if (err) return res.status(500).send(err);
    let result = cats.map((cat) => cat.transform());
    res.status(200).json(result);
  });
});

module.exports = router;
