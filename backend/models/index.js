const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/../config/db.config.js')[env];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD||null,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min, 
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require('./unit.model.js')(sequelize, Sequelize);
db.user = require('./dota.model.js')(sequelize, Sequelize);
db.tasks = require('./employee.model.js')(sequelize, Sequelize);
db.user = require('./incidence.model.js')(sequelize, Sequelize);
db.tasks = require('./inventory.model.js')(sequelize, Sequelize);


module.exports = db;