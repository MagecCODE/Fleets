const { where } = require("sequelize");
const db = require("../models");
const Incidence = db.incidences;
const Op = db.Sequelize.Op;

// Create and Save a new Incidence
exports.create = (req, res) => {
    // Validate request 
    if (!req.body.unitfleet || !req.body.dni_emp || !req.body.incidence_type) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Incidence
    const incidence = {
        unitfleet: req.body.unitfleet,
        dni_emp: req.body.dni_emp,
        incidence_type: req.body.incidence_type,
        description: req.body.description,
        date: req.body.date,
        status: req.body.status
    };    
    // Save Incidence in the database
    Incidence.create(incidence) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("[ERROR] en el método create del controlador de Incidence:", err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Incidence."
        });
    }); 
};

// Retrieve all Incidences from the database.
exports.findAll = async(req, res) => {
    try{
        const incidence = await Incidence.findAll();  
        res.json(incidence);
    } catch (err) {
        console.error("[ERROR] en el método findAll del controlador de Incidence:", err);
        res.status(500).send({  
            message:
                err.message || "Some error occurred while retrieving incidences."
        });
    };
};
// Find a single Incidence with an id
exports.findOne = (req, res) => {
    const id = req.params.id;   

    Incidence.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data); 
            } else {
                res.status(404).send({
                    message: `Cannot find Incidence with id=${id}.`
                });
            }   
        })
        .catch(err => {
            console.error("[ERROR] en el método findOne del controlador de Incidence:", err);
            res.status(500).send({
                message: "Error retrieving Incidence with id=" + id
            });
        });
};

// Update a Incidence by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Incidence.update(req.body, {
        where: { id: id }
    })
        .then(num => {  
            if (num == 1) {
                res.send({
                    message: "Incidence was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Incidence with id=${id}. Maybe Incidence was not found or req.body is empty!`
                });
            }   
        })
        .catch(err => {
            console.error("[ERROR] en el método update del controlador de Incidence:", err);
            res.status(500).send({
                message: "Error updating Incidence with id=" + id
            });
        });
};

// Delete a Incidence with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Incidence.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({          
                    message: "Incidence was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Incidence with id=${id}. Maybe Incidence was not found!`
                });
            }
        })
        .catch(err => {
            console.error("[ERROR] en el método delete del controlador de Incidence:", err);
            res.status(500).send({
                message: "Could not delete Incidence with id=" + id
            });
        }); 
};       