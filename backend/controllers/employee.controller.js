const { where } = require("sequelize");
const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Employee
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.dni) {
            return res.status(400).send({
                message: "DNI is required!"
            });
        }
        if (!req.body.password) {
            return res.status(400).send({
                message: "Password is required!"
            });
        }

        // Log the received data to verify the request body and file
        console.log("BODY RECIBIDO:", req.body);
        console.log("FILE RECIBIDO:", req.file);

        // Create employee object
        const employee = {
            name: req.body.name,
            surname: req.body.surname,
            dni: req.body.dni,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            prof: req.body.prof,
            rol: req.body.rol,
            filename: req.file ? req.file.filename : ""
        };

        //  Log the employee object to verify the received data
        console.log("[BACKEND] Usuario desde el controlador:", employee);

        // Verify if already exists an employee with that DNI
        const existingEmployee = await Employee.findOne({ where: { dni: employee.dni } });

        if (existingEmployee) {
            return res.status(400).send({
                message: `Employee with dni=${employee.dni} already exists.`
            });
        }

        // Creat empleoyee in the database
        const data = await Employee.create(employee);
        return res.send(data);
    } catch (err) {
        console.error("[ERROR] en el método create del controlador de Employee:", err);
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    }
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
exports.update = async (req, res) => {
    const id = req.params.id;

    const data={};

    if(req.body.name) data.name = req.body.name;
    if(req.body.surname) data.surname = req.body.surname;
    if(req.body.dni) data.dni = req.body.dni;
    if(req.body.password) data.password = req.body.password;
    if(req.body.email) data.email = req.body.email;
    if(req.body.phone) data.phone = req.body.phone;
    if(req.body.prof) data.prof = req.body.prof;
    if(req.body.rol) data.rol = req.body.rol;
    try{
        const [num] = await Employee.update(data, {
            where: { id: id }
        });
        return res.send(
            num == 1
                ? { message: "Employee was updated successfully." }
                : { message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!` }
        );  
    } catch (err) {
        console.error("[ERROR] en el método update del controlador de Employee:", err);
        res.status(500).send({
            message: "Error updating Employee with id=" + id
        });
    }
}; 

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;  
        
    Employee.destroy({
        where: { id: id }
    })  
    .then(num => {
        return res.send(
            num == 1
                ? { message: "Employee was deleted successfully." }
                : { message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!` }
        );
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
    Employee.findAll({ where: { prof: prof } })
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

//Update profile photo
exports.updatePhoto = async (req, res) => {
    try {
        const id = req.params.id;    
        if (!req.file) {return res.status(400).send({ message: "No file uploaded" });};
        await Employee.update({ filename: req.file.filename }, { where: { id } });
        return res.send({ message: "Profile photo updated successfully", filename: req.file.filename });
    } catch (err) {
        console.error("[ERROR] en el método updatePhoto del controlador de Employee:", err);
        return res.status(500).send({ message: err.message });
    }
};

// Login method for employees (basic, without JWT or password hashing for now)
exports.login = async (req, res) => {
    try {
        const { dni, password } = req.body;

        // Basic validation request
        if (!dni || !password) {
            return res.status(400).send({
                message: "dni y password son obligatorios."
            });
        }

        // Find employee by dni
        const employee = await Employee.findOne({ where: { dni } });

        if (!employee) {
            return res.status(401).send({
                message: "Credenciales incorrectas."
            });
        }

        // Check password (in a real app, use hashed passwords and a secure comparison method)
        if (employee.password !== password) {
            return res.status(401).send({
                message: "Credenciales incorrectas."
            });
        }

        // Login succesfull
        return res.status(200).send({
            message: "Login correcto",
            user: employee
        });

    } catch (err) {
        console.error("[ERROR] en el método login del controlador de Employee:", err);
        return res.status(500).send({
            message: "Error en el servidor durante el login."
        });
    }
};
