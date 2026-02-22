const {INVENTORY_STATUS} = require("../constants/roles");

module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventories", {
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
        item_name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        quantity:{
            type: Sequelize.INTEGER,
            allowNull: false    
        },
        status:{
            type: Sequelize.ENUM(...Object.values(INVENTORY_STATUS)),
            allowNull: false
        }
    });

    /*
    *** ASOCIACIONES CON LA BBDD Y LOS MODELOS ***
    */
    Inventory.associate = function(models) {
        Inventory.belongsTo(models.units, { foreignKey: "unitfleet", targetKey: "unitfleet" });
        Inventory.belongsTo(models.employees, { foreignKey: "dni_emp", targetKey: "dni" });
    };

    return Inventory
};