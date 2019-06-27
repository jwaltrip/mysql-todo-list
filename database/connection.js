const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_DB_NAME || "", process.env.MYSQL_USER || "", process.env.MYSQL_PASS || "", {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: false
});

// export the sequelize connection constructor
module.exports = sequelize;
// also make the sequelize connection contructor a global variable
// usually this is a bad idea, but for this it serves our purposes well
global.sequelize = sequelize;
