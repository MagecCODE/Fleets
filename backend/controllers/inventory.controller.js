const { where } = require("sequelize");
const db = require("../models");
const Inventory = db.inventories;
const Op = db.Sequelize.Op;

// Create and Save a new Inventory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.unitfleet || !req.body.dni_emp || !req.body.item_name) {
        return res.status(400).send({
            message: "unitfleet, dni_emp y item_name son obligatorios."
        });
    };

    // Create a Inventory
    const inventory = {
    unitfleet: req.body.unitfleet,
    dni_emp: req.body.dni_emp,
    item_name: req.body.item_name,
    quantity: req.body.quantity,
    status: req.body.status
    };

    // Save Inventory in the database
    Inventory.create(inventory)
    .then(data => {
        res.send(data);   
    })
    .catch(err => {
        console.error("[ERROR] en el método create del controlador de Inventory:", err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Inventory."
        });
    }); 
};

// Retrieve all Inventory from the database.
exports.findAll = (req, res) => {
    Inventory.findAll()
        .then(data => res.send(data))
        .catch(err => {
            console.error("[ERROR] findAll Inventory:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving inventories."
            });
        });
};

// Find a single Inventory with an id
exports.findByID = (req, res) => {
    const id = req.params.id;   
    Inventory.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find Inventory with id=${id}.`
            });
        }       
    })
    .catch(err => {
        console.error("[ERROR] en el método findByID del controlador de Inventory:", err);
        res.status(500).send({
            message: "Error retrieving Inventory with id=" + id
        });
    });
};

// Retirve inventory by Unit
exports.findAllByUnit = (req, res) => {
    const unitfleet = req.query.unitfleet;
    var condition = unitfleet ? { unitfleet: { [Op.like]: `%${unitfleet}%` } } : null;
    
    Inventory.findAll({ where: condition })
    .then(data => {
        res.send(data);   
    })
    .catch(err => {
        console.error("[ERROR] en el método findAll del controlador de Inventory:", err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving inventories."
        });
    }); 
};

// Find a item of inventory by name
exports.findByItemName = (req, res) => {
    const item_name = req.params.item_name;
    Inventory.findAll({ where: { item_name: item_name } })
    .then(data => {
        res.send(data); 
    })
    .catch(err => {
        console.error("[ERROR] en el método findByName del controlador de Inventory:", err);
        res.status(500).send({
            message: "Error retrieving Inventory with name=" + item_name
        });
    });
};

// Update a Inventory by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;   
    const data={};

    if(req.body.unitfleet) data.unitfleet = req.body.unitfleet;
    if(req.body.dni_emp) data.dni_emp = req.body.dni_emp;
    if(req.body.item_name) data.item_name = req.body.item_name;
    if(req.body.quantity) data.quantity = req.body.quantity;
    if(req.body.status) data.status = req.body.status;

    try{
        const [num] = await Inventory.update(data, {        
            where: { id }
        });
        return res.send(
            num == 1
                ? { message: "Inventory was updated successfully." }
                : { message: `Cannot update Inventory with id=${id}. Maybe Inventory was not found or req.body is empty!`
        });
    }
    catch(err) {
        console.error("[ERROR] en el método update del controlador de Inventory:", err);
        res.status(500).send({
            message: "Error updating Inventory with id=" + id
        });
    }
};

// Delete a Inventory with the specified id in the request  
exports.delete = (req, res) => {
    const id = req.params.id;   
    Inventory.destroy({
        where: { id: id }
    })
    .then(num => {  
        return res.send(
            num == 1
                ? { message: "Inventory was deleted successfully." }
                : { message: `Cannot delete Inventory with id=${id}. Maybe Inventory was not found or req.body is empty!`
        });
    })
    .catch(err => {
        console.error("[ERROR] en el método delete del controlador de Inventory:", err);
        res.status(500).send({            
            message: "Could not delete Inventory with id=" + id
        });
    });
};