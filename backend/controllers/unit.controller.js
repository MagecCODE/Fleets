const { where } = require("sequelize");
const db = require("../models");
const Unit = db.units;
const Op = db.Sequelize.Op;

// Create and Save a new Unit
exports.create = (req, res) => {

    if(!req.body.unitFleet) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }; 
    // Create a Unit
    const unit = {
        unitfleet: req.body.unitFleet,
        typefleet: req.body.typeFleet
    };
    // Save Unit in the database
    Unit.create(unit)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            console.error("[ERROR] en el método create del controlador de Unit:", err);
            return res.status(500).send({                
            message:
                err.message || "Some error occurred while creating the Unit."
        });
    });
};

// Retrieve all Units from the database.
exports.findAll = async(req, res) => {
    try{
        const unit = await Unit.findAll();  
        res.json(unit);
    } catch (err) {
        console.error("[ERROR] en el método findAll del controlador de Unit:", err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving units."
        });
    };
};

// Find a single Unit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;   

    Unit.findByPk(id)
        .then(data => {
            if (data) {
                return res.send(data);
            } else {     
                return res.status(404).send({
                    message: `[ERROR] Cannot find Unit with id=${id}.`
                });
            };
        })
        .catch(err => {
            console.error("[ERROR] en el método findOne del controlador de Unit:", err);
            return res.status(500).send({
                message: "Error retrieving Unit with id=" + id
            });
        });
};

// Update a Unit by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;  

    Unit.update(req.body, {
        where: { id: id }
    }) 
    .then(num => {
        if (num == 1) {
            return res.send({
                message: "Unit was updated successfully."
            });
        } else {
            return res.send({
                message: `Cannot update Unit with id=${id}. Maybe Unit was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        console.error("[ERROR] en el método update del controlador de Unit:", err);
        return res.status(500).send({
            message: "Error updating Unit with id=" + id
        });
    });
};

// Delete a Unit with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;   
    Unit.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            return res.send({
                message: "Unit was deleted successfully!"
            });
        } else {
            return res.send({
                message: `Cannot delete Unit with id=${id}. Maybe Unit was not found!`
            });
        }
    })
    .catch(err => {
        console.error("[ERROR] en el método delete del controlador de Unit:", err);
        return res.status(500).send({
            message: "Could not delete Unit with id=" + id
        });
    }); 
};

