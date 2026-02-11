require('dotenv').config();

module.exports = app =>{
    const dotas = require("../controllers/dota.controller.js");
    let router = require("express").Router();
    const API= process.env.API_URL;
    const DOTA_URL = API + process.env.DOTA_URL;

    // Create a new Dota
    router.post(DOTA_URL, dotas.create);
    // Retrieve all Dotas
    router.get(DOTA_URL, dotas.findAll);     
    // Retrieve a single Dota with id
    router.get("/:id", dotas.findOne);
    // Update a Dota with id
    router.put(DOTA_URL + "/:id", dotas.update);   
    // Delete a Dota with id
    router.delete(DOTA_URL + "/:id", dotas.delete);
};