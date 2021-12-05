"use strict";
// let MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://omerharush:Zz123456@cluster0.xkhsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const express = require("express");
var fs = require("fs");

// Constants
const PORT = 80;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", (req, res) => {
    fs.readFile("store.txt","utf8", (err, data) => {
        if (err) { console.log(err) }
        res.send('Number of post requests: ' + data.toString());
    });
 
});

app.post("/", (req, res) => {
    fs.readFile("store.txt","utf8", (err, data) => {
        if (err) { console.log(err) }
        data++;
                
        fs.writeFile("store.txt", data.toString(), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });
    res.send('200');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
