const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
var session = require("express-session");
const passport = require("passport");
const routes = require("./routes/index");
const cors = require("cors");
require("./db.js");
const server = express();
server.use(session({
  secret: 'my-secret-key', // La clave secreta que se utiliza para firmar la cookie de la sesión
  resave: false, // Evita que se vuelva a guardar la sesión si no se ha modificado
  saveUninitialized: false // Evita que se cree una sesión vacía cuando un usuario inicia sesión sin datos adicionales
}));
server.use(passport.initialize());
server.use(passport.session());
server.name = "API";
require("./auth/auth");
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(cors());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
