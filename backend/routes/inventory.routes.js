module.exports = app =>{
    const inventory = require("../controllers/inventory.controller.js");
    let router = require("express").Router();

    // Create a new Inventory
    router.post("/", inventory.create);
    // Retrieve all Inventories
    router.get("/", inventory.findAll);     
    // Retrieve a single Inventory with id
    router.get("/:id", inventory.findOne);
    // Update a Inventory with id
    router.put("/:id", inventory.update);   
    // Delete a Inventory with id
    router.delete("/:id", inventory.delete);
};