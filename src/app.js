const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const expressconnection = require("express-myconnection");

const app = express();
// importando rutas
const customer_routes = require("./routes/customer");

// ----------------------------------------------------------------

// setting
// __dirname da la ruta del archivo que lo ejecuta (app)
app.set("port", process.env.Port || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----------------------------------------------------------------

// Middleware (alterar, convertir datos, etc)
// Se ejecutan antes de las peticiones de los usuarios
app.use(morgan("dev"));
app.use(
  expressconnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "password",
      port: 3306,
      database: "crud",
    },
    "single"
  )
);
// urlencode permite entender datos que vengan del form
app.use(express.urlencoded({ extended: false }));

// ----------------------------------------------------------------

// routes
app.use("/", customer_routes);

// ----------------------------------------------------------------

// static files - son archivos para el frontend (html, css, etc)
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------------------------------------------

// empezando servidor
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
