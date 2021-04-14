const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/seebiz", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Database connection successful.");
    })
    .catch((error) => {
        console.error("DB not connected: ", error);
    });

module.exports = mongoose;