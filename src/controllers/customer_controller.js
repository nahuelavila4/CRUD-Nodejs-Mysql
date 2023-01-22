// En controller se guardan los metodos/funciones para cada ruta
const controller = {};

// getConnection es metodo de expresscon, pide conexion a mysql
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select * from customer", (err, customers) => {
      if (err) {
        res.json(err);
      }
      res.render("customers", {
        data: customers,
      });
    });
  });
};

// el ? significa que va a insertar los datos de la variable
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((req, conn) => {
    conn.query("INSERT INTO customer set ?", [data], (err, customer) => {
      console.log(customer);
      res.send("works");
    });
  });
};
// si no hay error devuelve customers.ejs, NO hace falta poner la extension
// el valor de data es lo que devuelve la query hecha a mysql
module.exports = controller;
