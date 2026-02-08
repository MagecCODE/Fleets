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
            type: Sequelize.ENUM(
                "Stock",
                "Stock Out"
            ),
            allowNull: false
        }
    });
    return Inventory
};