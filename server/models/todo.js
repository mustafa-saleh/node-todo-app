const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: 256,
    trim: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.method("transform", function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  obj.categoryName = obj.category.name;
  delete obj._id;
  delete obj.category;

  return obj;
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
