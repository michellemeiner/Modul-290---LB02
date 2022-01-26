const customer = require("./controller.js");
module.exports = (app) => {
    //Create a new customer (SQL-Insert)
    app.post("/customer", customer.create);

    //Retrieve all customers (SQL-SELECT)
    app.get('/customers', customer.getAll);

    //Retrieve single customer (SQL-SELECT)
    app.get('/customer/:id', customer.findById);

    //Update a customer with customerId (SQL-UPDATE)
    app.put('/customer/:id', customer.updateById);

    //Delete a customer with customerId (SQL-Delete)
    app.delete('/customer/:id', customer.removeById);

    //Delete all customers (SQL-Delete)
    app.delete('/customers', customer.removeAll);
};
