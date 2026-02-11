require('dotenv').config();

module.exports = app =>{
    const inventory = require("../controllers/inventory.controller.js");
    let router = require("express").Router();
    const API= process.env.API_URL;
    const INVENTORY_URL = API + process.env.INVENTORY_ROUTE;

    // Create a new Inventory
    router.post(INVENTORY_URL, inventory.create);
    // Retrieve all Inventories
    router.get(INVENTORY_URL, inventory.findAll);     
    // Retrieve a single Inventory with id
    router.get(INVENTORY_URL + "/:id", inventory.findOne);
    // Update a Inventory with id
    router.put(INVENTORY_URL + "/:id", inventory.update);   
    // Delete a Inventory with id
    router.delete(INVENTORY_URL + "/:id", inventory.delete);
};