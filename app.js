require("./source/db/connection");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const {
    Users
} = require("./source/models/collections");
const {
    Catalogs
} = require("./source/models/collections");
const port = 8080;

app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json());
app.set("view engine", "hbs");

hbs.registerHelper("tostring", function(value) {
    return JSON.stringify(value);
});

app.get("/", async(req, res) => {
    var user = await Users.find({}, {
        _id: 1,
        business_name: 1,
    });
    res.render("index", {
        user,
    });
});

app.get("/business", async(req, res) => {
    var Id = mongoose.Types.ObjectId(req.query.id);

    var catalogs = await Catalogs.find({
            userId: Id,
        })
        .lean()
        .select("_id slug type catalogCategory products categoryLink")
        .exec();
    var user = await Users.find({}, {
        _id: 1,
        business_name: 1,
    });

    res.send({
        user,
        catalogs,
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});