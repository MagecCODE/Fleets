require('dotenv').config();

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    const router = require("express").Router();
    let upload = require('../multer/upload.js');

    const API = process.env.API_URL;              
    const EMPLOYEES_URL = process.env.EMPLOYEES_ROUTE; // /employees

    router.post("/login", employees.login);
    
    router.post("/", upload.single('file'), employees.create);
    router.get("/", employees.findAll);

    // RUTAS ESPECÍFICAS PRIMERO
    router.get("/dni/:dni", employees.findByDni);
    router.get("/prof/:prof", employees.findByProf);

    // RUTA GENÉRICA AL FINAL
    router.get("/:id", employees.findOne);

    router.put("/:id", employees.update);
    router.delete("/:id", employees.delete);

    router.put("/:id/photo", upload.single('file'), employees.updatePhoto);


    app.use(API + EMPLOYEES_URL, router);
};
