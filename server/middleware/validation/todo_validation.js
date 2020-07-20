const { Category } = require("../../models/category");
const { Todo } = require("../../models/todo");

function validBody(req, res, next) {
  const data = req.body;
  console.log('REQUEST:', data)
  
  if (data.body == null || data.done == null || data.categoryName == null) {
    return res.status(400).json({error: `Invalid Request!`});
  }
  next();
}

function validCategory(req, res, next) {
  const cat = req.body.categoryName;

  Category.findOne({ 'name': cat }, (err, item) => {
    if (err) return res.status(500).send(err);
    if (!item) return res.status(400).json({ error: `Invalid Category!` });

    req.category = item;
    next();
  });
}

function validId(req, res, next) {
  const id = req.params.id;

  Todo.findOne({ '_id': id }, (err, item) => {
    if (err) return res.status(500).send(err);
    if (!item) return res.status(400).json({ error: `Item Not Found!` });

    next();
  });
}

module.exports = { validBody, validCategory, validId };
