const {INVENTORY_STATUS} = require("../constants/roles");

module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventories", {
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
    return Inventory
};