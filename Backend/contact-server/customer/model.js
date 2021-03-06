const sql = require("../db.js");

module.exports = class Customer {
    // constructor
    constructor() {
    }

    /***
     * Create a new customer
     * @param newCustomer: customer data (object literal)
     * @param cbResult: result of sql statement
     */
    create(newCustomer, cbResult) {
        sql.query('INSERT INTO customer SET ?', newCustomer, (err, res) => {
            if (err) {
                console.log("error: ", err);
                cbResult(err, null);
                return;
            }
            console.log("created contact: ", {id: res.insertId, ...newCustomer});
            cbResult(null,
                {msg: "New Contact from has been inserted!", id: res.insertId, ...newCustomer});
        });
    }


    /**
     * Select customer by ID
     * @param id
     * @param cbResult: result of sql statement
     */
    //Lese einen einzelnen Kunden anhand der ID aus
    findById(id, cbResult) {
        sql.query(`SELECT * FROM customer as c WHERE c.id=?`, id, (err, result) => {
            if (err) {
                if(err.kind === "not_found"){
                    res.status(HTTP_STATUS.BAD_REQUEST).send({
                        messgae: `Not found customer with id ${id}.`
                    })
                }
                console.log("error: ", err);
                cbResult(err, null);
                return;
            }
            //result of the select (greater than 0) has found a record (Tupel)
            if (result.length) {
                console.log("found customer: ", result[0]);
                cbResult(null, result[0]);
                return;
            }
        });
    };


    /**
     * Get all customers
     * @param cbResult: result of sql statement
     */
    getAll(cbResult){
        sql.query('SELECT * FROM customer', (err,result) => {
            if (err){
                console.log("error: ", err);
                //err zurückgeben, data = null
                cbResult(err, null);
                return;
            }
            console.log("customer: ", result);
            //err = null, data zurückgeben
            cbResult(null, result);
        })
    }


    /**
     * Update customer by ID
     * @param id: customer ID
     * @param customer: customer object literal
     * @param cbResult: result of sql statement
     */
    updateById(id, customer, cbResult) {
        //Aufgabe: Update der Attribute lastName, subject, description, phone
        //--Begin
        let queryString = 'UPDATE customer SET email = ?, firstName = ?';
        queryString += ' WHERE id = ?';
        //--End
        sql.query(queryString,
            [customer.email, customer.firstName, parseInt(id)],
            (err, result) => {
                if (err){
                    console.log("error: ", err);
                    //err zurückgeben, data = null
                    cbResult(err, null);
                    return;
                }

                if (result.affectedRows === 0) {
                    // not found Customer with the id
                    cbResult({kind: "not_found"}, null);
                    return;
                }

                console.log("updated customer: ", {id: id, ...customer});
                cbResult(null, {id: id, ...customer});
            }
        );
    };

    /**
     * Remove single customer by ID
     * @param id
     * @param cbResult: result of sql statement
     */
    //Aufgabe: Einzelnen Kunden anhand der ID löschen
    //--Begin
    removeById(id, cbResult) {
        let queryString = 'DELETE FROM customer WHERE id = ?';
        sql.query(queryString, id, (err, result) => {
            if (err) {
                console.log("error: ", err);
                //err zurückgeben, data = null
                cbResult(err, null);
                return;
            }

            if (result.affectedRows === 0) {
                 cbResult({kind: "not_found"}, null);
                 return;
            }

            console.log("deleted customer with id: ", id);
            cbResult(null, {});
        });
    }
    //--End

    /**
     * Remove all customers
     * @param cbResult: result of sql statement
     */
    //Aufgabe: Alle Kunden löschen
    //--Begin
    removeAll(cbResult) {
        let queryString = 'DELETE FROM customer';
        sql.query(queryString, (err, result) => {
            if (err) {
                console.log("error: ", err);
                //err zurückgeben, data = null
                cbResult(err, null);
                return;
            }

            if (result.affectedRows === 0) {
                cbResult({kind: "not_found"}, null);
                return;
            }

            console.log(`deleted ${result.affectedRows} customer`);
            cbResult(null, {});
        });
    }
}

