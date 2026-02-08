module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
        
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dni: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true    
        },  
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prof: {
            type: Sequelize.ENUM(
                "Facultativo",
                "Enfermero", 
                "Técnico en Emergencias Sanitarias",
            ),
            defaultValue: "Técnico en Emergencias Sanitarias"
        }, 
        rol: {
            type: Sequelize.ENUM(
                "Admin", 
                "Logistics", 
                "Mro", 
                "Sanitary"
            ),
            defaultValue: "Sanitary"
        }, 
        filename:{
            type: Sequelize.STRING,
        }            
    });
    return Employee;
};