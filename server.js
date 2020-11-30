const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Load database models
require("./models/User");

const keys = require("./keys");
const { graphQLHttpForGet, graphQLHttpForPost } = require("./graphql");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     if (req.method === "OPTIONS") return res.status(200).end();
//     next();
// });

// graphql route
app.get("/api", graphQLHttpForGet);
app.post("/api", graphQLHttpForPost);

mongoose
    .connect(keys.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(keys.PORT, () => console.log(`server listening on port ${keys.PORT}`));
    })
    .catch((err) => console.error(err));
