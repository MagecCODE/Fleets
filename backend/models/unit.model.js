const {UNIT_TYPES} = require("../constants/roles");

module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("units", {
        unitfleet: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },          
        typefleet: {
            type: Sequelize.ENUM(...Object.values(UNIT_TYPES)),
            defaultValue: UNIT_TYPES.SVB,
            allowNull: false
        }, 
    });

    /*
    *** ASOCIACIONES CON LA BBDD Y LOS MODELOS ***
    */
    Unit.associate = function(models) {
        Unit.hasOne(models.dotas, { foreignKey: "unitfleet", sourceKey: "unitfleet" });
        Unit.hasOne(models.incidencies, { foreignKey: "unitfleet", sourceKey: "unitfleet" });
        Unit.hasOne(models.inventories, { foreignKey: "unitfleet", sourceKey: "unitfleet" });
    };

    return Unit;
};