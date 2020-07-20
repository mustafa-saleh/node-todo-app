const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const { seedDb } = require("./models/database");
const categories = require("./routes/category");
const todos = require("./routes/todo");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://mustafa-saleh.github.io/personal_assistant",
  })
);

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/PersonalAssistant",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(`ERROR: ${err}`);
    else {
      console.log("Connected to DB!");
      seedDb();
    }
  }
);

app.use("/api/categories", categories);
app.use("/api/todos", todos);

const port = process.env.PORT || 8181;
app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
