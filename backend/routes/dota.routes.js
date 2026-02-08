module.exports = app =>{
    const dotas = require("../controllers/dota.controller.js");
    let router = require("express").Router();

    // Create a new Dota
    router.post("/", dotas.create);
    // Retrieve all Dotas
    router.get("/", dotas.findAll);     
    // Retrieve a single Dota with id
    router.get("/:id", dotas.findOne);
    // Update a Dota with id
    router.put("/:id", dotas.update);   
    // Delete a Dota with id
    router.delete("/:id", dotas.delete);
};