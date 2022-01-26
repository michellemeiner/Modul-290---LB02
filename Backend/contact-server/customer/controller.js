const Customer = require('./model');
const Validation = require('../ValidationService');
const HTTP_STATUS = require('../config/httpcodes.config');

// Create a Customer
const customerObj = new Customer();

// Create and Save a new Customer
function create(req, res) {
  // Validate request
  if (!req.body) {
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
  }

  let data = {
    "email": req.body.email,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "registered": (new Date()),
    "subject": req.body.subject,
    "description": req.body.description,
    "phone": req.body.phone,
    "address": req.body.address,
  }

  console.log(`Following data parsed from body ..`);
  console.log(data);

  let result = Validation.validateContact(data);
  if (result.isNotValid) {
    res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(result.msg);
  } else {
    // Save Customer in the database
    customerObj.create(data, (err, result) => {
      if (err)
        res.status(HTTP_STATUS.SERVER_ERROR).send({
          message:
              err.message || "Some error occurred while creating the Customer."
        });
      else res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(result);
      //or
      //else res.status(201).send(`New Contact from ${data.email} has been inserted!`);
    });
  }
}


//Lesen Sie alle Kunden/Daten aus der Tabelle customer aus (done)
function getAll(req, res){
  customerObj.getAll((err, result) => {
    if (err)
      res.status(HTTP_STATUS.SERVER_ERROR).send({
        message:
            err.message || "Some error occurred while retrieving customers."
      });
    else res.send(result);
  });
}

//Lese einen einzelnen Kunden anhand der ID aus (done)
function findById(req, res){
  customerObj.findById(req.params.id, (err, result) => {
    if (err)
      res.status(HTTP_STATUS.SERVER_ERROR).send({
        message:
            err.message || "Some error occurred while retrieving customer."
      });
    else res.send(result);
  });
}
//--End

// Update a Customer identified by the customerId in the request
function updateById(req, res){
  // Validate Request
  if (!req.body) {
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
  }

  customerObj.updateById(req.params.id, req.body,
    (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(HTTP_STATUS.NOT_FOUND).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(HTTP_STATUS.SERVER_ERROR).send({
            message: `Error updating Customer with id ${req.params.id}.`
          });
        }
      } else res.send(result);
    }
  );
}


//Aufgabe: Einzelnen Kunden anhand der ID löschen (done)
//--Begin
function removeById(req,res){
  customerObj.removeById(req.params.id,
    (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(HTTP_STATUS.NOT_FOUND).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(HTTP_STATUS.SERVER_ERROR).send({
            message: `Error updating Customer with id ${req.params.id}.`
          });
        }
      } else res.send(result);
    }
  );
}
//--End

//Aufgabe: Alle Kunden löschen
//--Begin
function removeAll(req, res){
  customerObj.removeAll((err, result) => {
        if (err) {
            res.status(HTTP_STATUS.SERVER_ERROR).send({
              message: `Error updating Customer with id ${req.params.id}.`
            });
        } else res.send(result);
      }
  );
}
//--End


/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT brackets!
 */
module.exports = {
  create,
  getAll,
  findById,
  updateById,
  removeById,
  removeAll
}