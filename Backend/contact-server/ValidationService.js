// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    console.log("___ Test");
    console.log(data);
    let result;
    // Check required fields //Check required firstName
    result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) { return result; }

    //Check required lastName
    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    //Check required email
    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) { return result; }

    //Check required phone
    result = validateLib.checkRequired("phone", data.phone);
    if (result.isNotValid) { return result; }

    //Check required subject
    result = validateLib.checkRequired("subject", data.subject);
    if (result.isNotValid) { return result; }

    //Check required description
    result = validateLib.checkRequired("description", data.description);
    if (result.isNotValid) { return result; }

    //Check required address
    result = validateLib.checkRequired("address", data.address);
    if (result.isNotValid) { return result; }



    //--End


    //check length --Begin
    //firstName
    result = validateLib.checkLength("firstName",data.firstName, 2, 20);
    if (result.isNotValid) { return result; }


    //lastName
    result = validateLib.checkLength("lastName",data.lastName, 3, 50);
    if (result.isNotValid) { return result; }

    //lastSubject
    result = validateLib.checkLength("subject",data.subject, 8, 20);
    if (result.isNotValid) { return result; }



    //--End

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) { return result; }

    //check mobile syntax
    //Aufgabe: Validierungsregel der Mobilenummer anwenden
    //--Begin
    result = validateLib.checkPhone("phone", data.phone);
    if (result.isNotValid) { return result; }
    //--End

    //check Address syntax
    result = validateLib.checkAddress("address", data.address);
    if (result.isNotValid) { return result; }

    //check desciption syntax
    result = validateLib.checkDescription("description", data.description);
    if (result.isNotValid) { return result; }

    //check subject syntax
    result = validateLib.checkSubject("subject", data.subject);
    if (result.isNotValid) { return false; }




    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData
}
