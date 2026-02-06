const { where } = require("sequelize");
const db = require("../models");
const Dota = db.dotas;
const Unit = db.units;
const Op = db.Sequelize.Op;

// Create and Save a new Dota
exports.create = async (req, res) => {
    try {
        const { unitfleet, driveId, sanitId, facultId } = req.body;

        // 1. Buscamos la unidad para saber qué tipo de ambulancia es
        // Nota: Asegúrate de buscar por el campo que sea tu Primary Key
        const unidad = await Unit.findOne({ where: { id: unitfleet } });

        if (!unidad) {
            return res.status(404).send({ message: "La unidad especificada no existe." });
        }

        // 2. Lógica de validación según el ENUM 'typefleet'
        const tipo = unidad.typefleet;

        switch (tipo) {
            case "MEDICALIZADA":
                // Requiere los 3: Conductor, Sanitario y Médico
                if (!driveId || !sanitId || !facultId) {
                    return res.status(400).send({
                        message: "Una unidad MEDICALIZADA requiere obligatoriamente: Conductor, Sanitario y Médico."
                    });
                }
                break;

            case "SANITARIZADA":
            case "SOPORTE VITAL BÁSICO":
                // Requieren al menos Conductor y Sanitario
                if (!driveId || !sanitId) {
                    return res.status(400).send({
                        message: `La unidad de tipo ${tipo} requiere obligatoriamente Conductor y Sanitario.`
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
        const nuevaDota = await Dota.create({
            unitfleet,
            driveId,
            sanitId,
            facultId
        });

        return res.status(201).send(nuevaDota);

    } catch (err) {
        console.error("[ERROR]", err);
        return res.status(500).send({ message: "Some error occurred while creating the Dota." });
    }
};
// Retrieve all Dotas from the database.
