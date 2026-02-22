require('dotenv').config();

module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");
    const router = require("express").Router();

    const API = process.env.API_URL;              
    const INVENTORY_URL = process.env.INVENTORY_ROUTE; // /inventories

    router.post("/", inventory.create);
    router.get("/", inventory.findAll);
    router.get("/:id", inventory.findByID);
    router.get("/unit/:unitfleet", inventory.findAllByUnit);
    router.get("/item/:item_name", inventory.findByItemName);
    router.put("/:id", inventory.update);
    router.delete("/:id", inventory.delete);

    app.use(API + INVENTORY_URL, router);
};