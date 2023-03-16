/* Imports */
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const HttpServer = require("http").Server;
const session = require("express-session");
const cors = require("cors");
const logger = require("./config/logger");
const config = require("./config/config");

/* Express server */
const app = express();

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

//IMPLEMENTACION
const httpServer = require("http").createServer(app);

httpServer.listen(config.PORT, () => {
  config.PORT,
    config.MONGO_URL,
    console.log(`Server listening on port http://localhost:${config.PORT}`);
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const routerProducts = require("./routes/products");
app.use("/api/products", routerProducts);
