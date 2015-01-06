var express = require('express');
var app = express();
var cors = require("cors");
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/jetbrains');

var Item = mongoose.model('Item', {name: String});

app.get('/', function (req, res) {
    Item.find(function (err, items) {
        res.send(items);
    })
});

app.post("/add", function (req, res) {
    var name = req.body.name;
    var item = new Item({name: name});
    item.save(function (err) {
        res.send();
    })
});

app.post("/delete", function (req, res) {
    var id = req.body.name;
    for (var i=0; i<id.length; i++) {
        Item.remove({_id: id[i]}, function (err) {
            res.send();
        })
    }
});

app.listen(3000);