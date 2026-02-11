const {ROLES, PROFESSIONS} = require("../constants/roles");

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
            type: Sequelize.ENUM(...Object.values(PROFESSIONS)),
            defaultValue: PROFESSIONS.TECNICO_EMERGENCIAS_SANITARIAS
        }, 
        rol: {
            type: Sequelize.ENUM(...Object.values(ROLES)),
            defaultValue: ROLES.SANITARY
        }, 
        filename:{
            type: Sequelize.STRING,
        }            
    });
    return Employee;
};