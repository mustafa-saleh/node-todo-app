const mongoose = require("mongoose");
const fs = require("fs");

const { Category } = require("./category");

function seedDb() {
  Category.find((err, res) => {
    if (err) return console.log("Failed to Read Categories!");
    if (res.length === 0) {
      var file = fs
        .readFileSync(`${__dirname}/../data/categories.json`)
        .toString();
      var categories = JSON.parse(file);
      Category.insertMany(categories, (err, cats) => {
        if (err) throw err;
        console.log("Db seeded successfully!!");
      });
    }
  });
}

module.exports = { seedDb };
