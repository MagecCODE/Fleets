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
                "FACULTATIVO",
                "ENFERMERO", 
                "SANITARIO"
            ),
            defaultValue: "SANITARIO"
        }, 
        rol: {
            type: Sequelize.ENUM(
                "ADMIN", 
                "LOGISTIC", 
                "MRO", 
                "SANITARY"
            ),
            defaultValue: "SANITARY"
        }, 
        filename:{
            type: Sequelize.STRING,
        }            
    });
    return Employee;
};