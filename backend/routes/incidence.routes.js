require('dotenv').config();

module.exports = app => {
    const incidences = require("../controllers/incidence.controller.js");
    const router = require("express").Router();

    const API = process.env.API_URL; // /api              
    const INCIDENCES_URL = process.env.INCIDENCES_ROUTE; // /incidencies

    router.post("/", incidences.create);
    router.get("/", incidences.findAll);
    router.get("/:id", incidences.findOne);
    router.get("/unitfleet/:unitfleet", incidences.findByUnitFleet);
    router.get("/employee/:dni_emp", incidences.findByEmployeeDNI);
    router.put("/:id", incidences.update);
    router.delete("/:id", incidences.delete);

    app.use(API + INCIDENCES_URL, router);
};