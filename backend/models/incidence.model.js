const {INCIDENCE_TYPES, INCIDENCE_STATUS} = require("../constants/roles");

module.exports = (sequelize, Sequelize) => {
    const Incidence = sequelize.define("incidencies", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unitfleet:{
            type: Sequelize.INTEGER,
            allowNull: false,
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
            type: Sequelize.ENUM(...Object.values(INCIDENCE_TYPES)),
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
            type: Sequelize.ENUM(...Object.values(INCIDENCE_STATUS)),
            allowNull: false
        }
    });
    
    /*
    *** ASOCIACIONES CON LA BBDD Y LOS MODELOS ***
    */
    Incidence.associate = function(models) {
        Incidence.belongsTo(models.units, { foreignKey: "unitfleet", targetKey: "unitfleet" });
        Incidence.belongsTo(models.employees, { foreignKey: "dni_emp", targetKey: "dni" });
    };

    return Incidence;
};