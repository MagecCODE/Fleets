module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("units", {
        unitfleet: {
            type: Sequelize.NUMBER,
            allowNull: false
        },          
        typefleet: {
            type: Sequelize.ENUM(
                "MEDICALIZADA", 
                "SANITARIZADA", 
                "SOPORTE VITAL BÁSICO", 
                "NO URGENTE"
            ),
            defaultValue: "SOPORTE VITAL BÁSICO",
            allowNull: false
        }, 
    });
    return Unit;
};