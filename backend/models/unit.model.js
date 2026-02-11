const {UNIT_TYPES} = require("../constants/roles");

module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("units", {
        unitfleet: {
            type: Sequelize.INTEGER,
            allowNull: false
        },          
        typefleet: {
            type: Sequelize.ENUM(...Object.values(UNIT_TYPES)),
            defaultValue: UNIT_TYPES.SOPORTE_VITAL_BASICO,
            allowNull: false
        }, 
    });
    return Unit;
};