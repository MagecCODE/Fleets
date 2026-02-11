require('dotenv').config();

module.exports = app =>{
    const employees= require("../controllers/employee.controller.js");
    let router = require("express").Router();
    const API= process.env.API_URL;
    const EMPLOYEES_URL = API + process.env.EMPLOYEES_ROUTE;

    // Create a new Employee
    router.post(EMPLOYEES_URL, employees.create);
    // Retrieve all Employees
    router.get(EMPLOYEES_URL, employees.findAll);     
    // Retrieve a single Employee with id
    router.get("/:id", employees.findOne);
    // Retrieve a single Employee with dni
    router.get(EMPLOYEES_URL + "/dni/:dni", employees.findByDni);
    // Retrieve a single Employee with prof
    router.get(EMPLOYEES_URL + "/prof/:prof", employees.findByProf);
    // Update a Employee with id
    router.put("/:id", employees.update);   
    // Delete a Employee with id
    router.delete(EMPLOYEES_URL + "/:id", employees.delete);
};