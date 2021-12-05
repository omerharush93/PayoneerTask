"use strict";
let MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://omerharush:Zz123456@cluster0.xkhsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express");

// Constants
const PORT = 80;
const HOST = "0.0.0.0";
var DB = "payoneer";
var COLLECTION = process.argv[2].toString();

// App
const app = express();

// Check if counter exist and create zero counter if not
MongoClient.connect(uri, function (err, db) {
  if (err) throw err;
  var dbo = db.db(DB);
  dbo
    .collection(COLLECTION)
    .updateOne(
      { counter: { $exists: true } },
      { $setOnInsert: { counter: 0 } },
      { upsert: true },
      function (err, result) {
        if (err) throw err;
        if (result.matchedCount == 0) {
          console.log("Counter doesn't exists, inserts new counter to DB");
        }
        db.close();
      }
    );
});

// GET
app.get("/", (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DB);
    dbo
      .collection(COLLECTION)
      .findOne({}, { counter: { $exists: true } }, function (err, result) {
        if (err) throw err;
        console.log(result.counter);
        res.send("Number of post requests: " + result.counter.toString());
        db.close();
      });
  });
});

// POST
app.post("/", (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DB);
    dbo
      .collection(COLLECTION)
      .updateOne(
        { counter: { $exists: true } },
        { $inc: { counter: 1 } },
        function (err, result) {
          if (err) throw err;
          res.send('200');
          db.close();
        }
      );
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
