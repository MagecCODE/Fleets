module.exports = (sequelize, Sequelize) => {
    const Dota = sequelize.define("dotas", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        unitfleet: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        driveId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        sanitId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        facultId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });


    /*
    *** ASOCIACIONES CON LA BBDD Y LOS MODELOS ***
    */
    Dota.associate = function(models) {

        // 1. La Dotación pertenece a una Unidad de Flota
        Dota.belongsTo(models.units, {
            foreignKey: 'unitfleet', // El campo en esta tabla que es la FK
            as: 'Unidad'            // El alias de la BBDD
        });
        
        // 2. La Dotación pertenece a un Empleado (el Conductor)
        Dota.belongsTo(models.employees, {
            foreignKey: 'driveId', 
            as: 'Conductor'            
        });
        
        // 3. La Dotación pertenece a un Empleado (el Sanitario)
        Dota.belongsTo(models.employees, {
            foreignKey: 'sanitId',
            as: 'Sanitario'
        });

        // 4. La Dotación pertenece a un Empleado (el Médico)
        Dota.belongsTo(models.employees, {
            foreignKey: 'facultId',
            as: 'Facultativo'
        });
    };
    return Dota;
};