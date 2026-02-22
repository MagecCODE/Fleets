const { where } = require("sequelize");
const db = require("../models");
const Dota = db.dotas;
const Unit = db.units;
const Employee = db.employees;
const Op = db.Sequelize.Op;
const {PROFESSIONS} = require("../constants/roles");

// Create and Save a new Dota
exports.create = async (req, res) => {
    try {
        const { unitfleet, driveId, sanitId, facultId } = req.body;

        // 1. Buscamos la unidad para saber qué tipo de ambulancia es.
        // También  buscamos el empleado para comprobar el tipo de profesional que está asignado a cada rol 
        // y verificar que cumple con los requisitos de cada tipo de ambulancia.
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
        // NOTA: Nos aseguramos de buscar por el campo con Primary Key, es mas limipo,                           //// 
        // también nos aseguramos de usar Promise.all para optimizar las consultas a la base de datos,           //// 
        // porque así evitamos hacer múltiples consultas secuenciales que pueden ralentizar la aplicación,       //// 
        // en lugar de tardar [(por ejemplo) 100ms x consulta = 400ms],                                          //// 
        // con Promise.all hacemos las consultas en paralelo y el tiempo total será el de la consulta más lenta. //// 
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
        const [unit, driver, sanit, facult] = await Promise.all([
            Unit.findByPk(unitfleet),
            driveId ? Employee.findByPk(driveId) : null,
            sanitId ? Employee.findByPk(sanitId) : null,
            facultId ? Employee.findByPk(facultId) : null
        ]);


        if (!unit) {
            return res.status(404).send({ message: "La unidad especificada no existe." });
        }

        // 2. Lógica de validación según el ENUM 'typefleet'
        const unitType = unit.typefleet;

        switch (unitType) {
            case "MEDICALIZADA":
                // Requiere los 3: Conductor, Sanitario y Médico
                const isFacultMedico = facult?.prof === PROFESSIONS.FACULTATIVO;
                if (!driver || !sanit || !isFacultMedico) {
                    return res.status(400).send({
                        message: "Una unidad MEDICALIZADA requiere: Conductor, Sanitario y un Médico titulado."
                    });
                }
                break;

            case "SANITARIZADA":
                // Requieren un Conductor y un Enfermero
                if (!driver || !sanit || sanit.prof !== PROFESSIONS.ENFERMERO) {
                    return res.status(400).send({
                        message: "Una unidad SANITARIZADA requiere obligatoriamente: Conductor y Enfermero."
                    });
                }
                break;

            case "SOPORTE VITAL BÁSICO":
                // Requieren al menos Conductor y Sanitario
                if (!driver || !sanit) {
                    return res.status(400).send({
                        message: `La unidad de tipo ${unitType} requiere obligatoriamente Conductor y Sanitario.`
                    });
                }
                break;

            case "NO URGENTE":
                // Normalmente solo conductor, o conductor y sanitario según vuestra lógica
                if (!driveId) {
                    return res.status(400).send({ message: "El transporte NO URGENTE requiere al menos un conductor." });
                }
                break;
        };

        // 3. Si pasa el switch, creamos la dotación
        const newDota = await Dota.create({
            unitfleet,
            driveId,
            sanitId,
            facultId
        });

        return res.status(201).send(newDota);

    } catch (err) {
        console.error("[ERROR] en el método create del controlador de Dota:", err);
        return res.status(500).send({ message: "Some error occurred while creating the Dota." });
    }
};

// Retrieve all Dotas from the database.
exports.findAll = async (req, res) => {
    
    try {
        const dotas = await Dota.findAll();
        res.status(200).send(dotas);
    } catch (err) {
        console.error("[ERROR] en el método findAll del controlador de Dota:", err);
        res.status(500).send({ message: "Some error occurred while retrieving Dotas." });
    }
};

// Find a single Dota with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const dota = await Dota.findByPk(id);
        if (dota) {
            res.status(200).send(dota);
        }else {
            res.status(404).send({ message: `Cannot find Dota with id=${id}.` });
        }
    } catch (err) {
        console.error("[ERROR] en el método findOne del controlador de Dota:", err);    
        res.status(500).send({ message: "Error retrieving Dota with id=" + id });
    }   
};

// Find a single Dota with an Unit Fleet Number
exports.findByUnitFleet = async (req, res) => {
    const unitfleet = req.params.unitfleet; 
    try {
        const dota = await Dota.findOne({ where: { unitfleet } });
        if (dota) {
            res.status(200).send(dota);
        }else { 
            res.status(404).send({ message: `Cannot find Dota with Unit Fleet Number=${unitfleet}.` });
        }   
    } catch (err) {
        console.error("[ERROR] en el método findByUnitFleet del controlador de Dota:", err);    
        res.status(500).send({ message: "Error retrieving Dota with Unit Fleet Number=" + unitfleet });
    }
};

// Find a single Dota with an Employee id (driveId, sanitId o facultId)
exports.findByEmployeeId = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const dotas = await Dota.findAll({
            where: {
                [Op.or]: [
                    { driveId: employeeId },
                    { sanitId: employeeId },    
                    { facultId: employeeId }
                ]
            }
        }); 
        if (dotas.length > 0) {
            res.status(200).send(dotas);
        }else {
            res.status(404).send({ message: `Cannot find Dota with Employee id=${employeeId}.` });
        }
    } catch (err) {
        console.error("[ERROR] en el método findByEmployeeId del controlador de Dota:", err);    
        res.status(500).send({ message: "Error retrieving Dota with Employee id=" + employeeId });
    }
};

// Update a Dota by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Dota.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedDota = await Dota.findByPk(id);
            res.status(200).send(updatedDota);
        }else {
            res.status(404).send({ message: `Cannot update Dota with id=${id}. Maybe Dota was not found or req.body is empty!` });
        }
    } catch (err) {
        console.error("[ERROR] en el método update del controlador de Dota:", err);
        res.status(500).send({ message: "Error updating Dota with id=" + id });
    }   
};

// Delete a Dota with the specified id in the request   
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Dota.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(200).send({ message: "Dota was deleted successfully!" });
        }else {
            res.status(404).send({ message: `Cannot delete Dota with id=${id}. Maybe Dota was not found!` });
        }
    } catch (err) {
        console.error("[ERROR] en el método delete del controlador de Dota:", err);
        res.status(500).send({ message: "Could not delete Dota with id=" + id });
    }   
};
