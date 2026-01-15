module.exports = (sequelize, Sequelize) => {
    const Incidence = sequelize.define("incidencies", {
        unitfleet:{
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        dni_emp:{
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'employees', 
                key: 'dni'
            },
        },
        incidence_type:{
            type: Sequelize.ENUM(
                "MECÁNICA",
                "MATERIAL",
                "PACIENTE",
                "SERVICIO",
                "OTRO" 
            ),
            allowNull: false
        },
        description:{
            type: Sequelize.STRING,     
            allowNull: false
        },
        date:{
            type: Sequelize.DATE,
            allowNull: false
        },
        status:{
            type: Sequelize.ENUM(
                "PENDIENTE",
                "EN PROCESO",
                "RESUELTA"
            ),
            allowNull: false
        }
    });
    return Incidence;
};