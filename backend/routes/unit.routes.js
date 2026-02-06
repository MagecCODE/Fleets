module.exports = app =>{
    const units = require("../controllers/unit.controller.js");
    let router = require("express").Router();

    // Create a new Unit
    router.post("/", units.create);
    // Retrieve all Units
    router.get("/", units.findAll);     
    // Retrieve a single Unit with id
    router.get("/:id", units.findOne);
    // Update a Unit with id
    router.put("/:id", units.update);   
    // Delete a Unit with id
    router.delete("/:id", units.delete);
};