require('dotenv').config();

module.exports = app =>{
    const units = require("../controllers/unit.controller.js");
    let router = require("express").Router();
    const API= process.env.API_URL;
    const UNITS_URL = API + process.env.UNITS_ROUTE;

    // Create a new Unit
    router.post(UNITS_URL, units.create);
    // Retrieve all Units
    router.get(UNITS_URL, units.findAll);     
    // Retrieve a single Unit with id
    router.get(UNITS_URL + "/:id", units.findOne);
    // Update a Unit with id
    router.put(UNITS_URL + "/:id", units.update);   
    // Delete a Unit with id
    router.delete(UNITS_URL + "/:id", units.delete);
};