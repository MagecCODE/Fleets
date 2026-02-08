module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("units", {
        unitfleet: {
            type: Sequelize.INTEGER,
            allowNull: false
        },          
        typefleet: {
            type: Sequelize.ENUM(
                "Medicalizada", 
                "Sanitizada", 
                "Soporte Vital Básico", 
                "No Urgente"
            ),
            defaultValue: "Soporte Vital Básico",
            allowNull: false
        }, 
    });
    return Unit;
};