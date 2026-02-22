require('dotenv').config();

module.exports = app => {
    const dotas = require("../controllers/dota.controller.js");
    const router = require("express").Router();

    const API = process.env.API_URL;              
    const DOTA_URL = process.env.DOTA_ROUTE; // /dotas

    router.post("/", dotas.create);
    router.get("/", dotas.findAll);
    router.get("/:id", dotas.findOne);
    router.put("/:id", dotas.update);
    router.delete("/:id", dotas.delete);

    app.use(API + DOTA_URL, router);
};
