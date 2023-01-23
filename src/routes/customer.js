const express = require("express");

// Router es un objeto de js al que le podemos agregar rutas
const router = express.Router();

// importa customer_controller para usar su metodo list
const zxc = require("../controllers/customer_controller");

router.get("/", zxc.list);
router.post("/add", zxc.save);
router.get("/delete/:id", zxc.delete);
router.get("/update/:id", zxc.edit);
router.post("/update/:id", zxc.update);

module.exports = router;
