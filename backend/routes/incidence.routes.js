require('dotenv').config();

module.exports = app =>{
    const incidences = require("../controllers/incidence.controller.js");
    let router = require("express").Router();
    const API= process.env.API_URL;
    const INCIDENCES_URL = API + process.env.INCIDENCES_ROUTE;

    // Create a new Incidence
    router.post(INCIDENCES_URL, incidences.create);
    // Retrieve all Incidences
    router.get(INCIDENCES_URL, incidences.findAll);     
    // Retrieve a single Incidence with id
    router.get(INCIDENCES_URL + "/:id", incidences.findOne);
    // Update a Incidence with id
    router.put(INCIDENCES_URL + "/:id", incidences.update);   
    // Delete a Incidence with id
    router.delete(INCIDENCES_URL + "/:id", incidences.delete);
};