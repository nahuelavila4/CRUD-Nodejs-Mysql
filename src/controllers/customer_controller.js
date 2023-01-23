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
    conn.query("insert into customer set ?", [data], (err, customer) => {
      res.redirect("/");
    });
  });
};

// se usa params porque lo manda a travez de un parametro de la url
controller.delete = (req, res) => {
  const id = req.params.id;
  req.getConnection((req, conn) => {
    conn.query("delete from customer where id = ?", [id], (err, customer) => {
      res.redirect("/");
    });
  });
};

controller.edit = (req, res) => {
  const id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query("select * from customer where id = ?", [id], (err, customer) => {
      res.render("customer_edit", {
        data: customer[0],
      });
    });
  });
};

controller.update = (req, res) => {
  const id = req.params.id;
  const customer_update = req.body;
  req.getConnection((err, conn) => {
    conn.query("update customer set ? where id = ?", [customer_update, id], (err, customer) => {
      res.redirect("/")
    })
  });
};
// si no hay error devuelve customers.ejs, NO hace falta poner la extension
// el valor de data es lo que devuelve la query hecha a mysql
module.exports = controller;
