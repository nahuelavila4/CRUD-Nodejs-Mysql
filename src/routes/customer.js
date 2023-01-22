const express = require("express");

// Router es un objeto de js al que le podemos agregar rutas
const router = express.Router();

// importa customer_controller para usar su metodo list
const zxc = require("../controllers/customer_controller");

router.get("/", zxc.list);
router.post("/add", zxc.save);

module.exports = router;
