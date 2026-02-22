require('dotenv').config();

module.exports = app => {
    const units = require("../controllers/unit.controller.js");
    const router = require("express").Router();

    const API = process.env.API_URL;          // /api
    const UNITS_URL = process.env.UNITS_ROUTE; // /units

    // Rutas reales dentro del router
    router.post("/", units.create);
    router.get("/", units.findAll);
    router.get("/:id", units.findOne);
    router.put("/:id", units.update);
    router.delete("/:id", units.delete);

    // Montaje correcto del router en Express
    app.use(API + UNITS_URL, router);
};