const express = require("express");
const { Todo } = require("../models/todo");
const bodyParser = require("body-parser");

const {
  validBody,
  validCategory,
  validId,
} = require("../middleware/validation/todo_validation");

const router = express.Router();
router.use(bodyParser.json());

router.get("/", (req, res) => {
  Todo.find((err, items) => {
    if (err) return res.status(500).send(err);
    let result = items.map((item) => item.transform());
    res.status(200).json(result);
  }).populate('category');
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findOne({ _id: id }, (err, item) => {
    if (err) return res.status(500).send(err);
    if (!item) return res.status(404).json({ error: `Item not Found!` });
    res.status(200).json(item.transform());
  }).populate('category');
});

router.post("/", [validBody, validCategory], (req, res) => {
  const data = req.body;
  const todo = new Todo({
    body: data.body,
    done: data.done,
    category: req.category,
  });

  todo.save((err, item) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(item.transform());
  });
});

router.put("/:id", [validBody, validCategory, validId], (req, res) => {
  const data = req.body;
  const id = req.params.id;

  Todo.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        body: data.body,
        done: data.done,
        category: req.category,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(doc.transform());
    }
  ).populate('category');
});

router.delete("/:id", [validId], (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id }, (err, item) => {
    if (err) return res.status(500).send(err);
    if (!item) return res.status(404).json(`Item Not Found!`);

    res.status(200).json(item.transform());
  }).populate('category');
});

module.exports = router;
