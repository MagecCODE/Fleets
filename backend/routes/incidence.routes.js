module.exports = app =>{
    const incidences = require("../controllers/incidence.controller.js");
    let router = require("express").Router();

    // Create a new Incidence
    router.post("/", incidences.create);
    // Retrieve all Incidences
    router.get("/", incidences.findAll);     
    // Retrieve a single Incidence with id
    router.get("/:id", incidences.findOne);
    // Update a Incidence with id
    router.put("/:id", incidences.update);   
    // Delete a Incidence with id
    router.delete("/:id", incidences.delete);
};