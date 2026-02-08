module.exports = app =>{
    const employees= require("../controllers/employee.controller.js");
    let router = require("express").Router();

    // Create a new Employee
    router.post("/", employees.create);
    // Retrieve all Employees
    router.get("/", employees.findAll);     
    // Retrieve a single Employee with id
    router.get("/:id", employees.findOne);
    // Retrieve a single Employee with dni
    router.get("/dni/:dni", employees.findByDni);
    // Retrieve a single Employee with prof
    router.get("/prof/:prof", employees.findByProf);
    // Update a Employee with id
    router.put("/:id", employees.update);   
    // Delete a Employee with id
    router.delete("/:id", employees.delete);
};