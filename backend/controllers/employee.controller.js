const { where } = require("sequelize");
const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Employee
    const employee = {
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone, 
        prof: req.body.prof,
        rol: req.body.rol,
        filename: req.body.filename 
    };    
    // Save Employee in the database
    Employee.create(employee)    
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("[ERROR] en el método create del controlador de Employee:", err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
        });
    });
};    

// Retrieve all Employees from the database.
exports.findAll = async(req, res) => {
    try{
        const employee = await Employee.findAll();  
        res.json(employee);
    } catch (err) {
        console.error("[ERROR] en el método findAll del controlador de Employee:", err);
        res.status(500).send({  
            message:
                err.message || "Some error occurred while retrieving employees."
        });
    };
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;       

    Employee.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);         
            } else {
                res.status(404).send({
                    message: `[ERROR] Cannot find Employee with id=${id}.`
                });
            }   
        })
        .catch(err => {
            console.error("[ERROR] en el método findOne del controlador de Employee:", err);
            res.status(500).send({
                message: "Error retrieving Employee with id=" + id
            });
        });
};  

// Update a Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
        
    Employee.update(req.body, {
        where: { id: id }
    })  
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Employee was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
            });
        }       
    })  
    .catch(err => {
        console.error("[ERROR] en el método update del controlador de Employee:", err);
        res.status(500).send({
            message: "Error updating Employee with id=" + id
        });
    });
}; 

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;  
        
    Employee.destroy({
        where: { id: id }
    })  
    .then(num => {
        if (num == 1) {
            res.send({          
                message: "Employee was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
            });
        }
    })
    .catch(err => {
        console.error("[ERROR] en el método delete del controlador de Employee:", err);
        res.status(500).send({
            message: "Could not delete Employee with id=" + id
        });
    }); 
};

// Find a single Employee with an proifession
exports.findByProf = (req, res) => {
    const prof = req.params.prof;   
    Employee.findOne({ where: { prof: prof } })
    .then(data => {
        if (data) { 
            return res.send(data);
        } else {
            return res.status(404).send({
                message: `[ERROR] Cannot find Employee with profession=${prof}.`
            });
        }   
    })
    .catch(err => {
        console.error("[ERROR] en el método findByProf del controlador de Employee:", err);
        return res.status(500).send({
            message: "Error retrieving Employee with profession=" + prof
        });
    });
};

// Find a single Employee with an dni
exports.findByDni = (req, res) => {
    const dni = req.params.dni; 
    Employee.findOne({ where: { dni: dni } })
    .then(data => {
        if (data) { 
            return res.send(data);

        } else {
            return res.status(404).send({
                message: `[ERROR] Cannot find Employee with dni=${dni}.`
            });
        }   
    })
    .catch(err => {
        console.error("[ERROR] en el método findByDni del controlador de Employee:", err);
        return res.status(500).send({
            message: "Error retrieving Employee with dni=" + dni
        });
    });
};