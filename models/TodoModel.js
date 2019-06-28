const Sequelize = require("sequelize")

/*
*   NOTE: Watch the capitalization of the @sequelize variable
*
*    - Lowercase "sequelize" = global connection variable
*    - Uppercase "sequelize" = imported module
* */

module.exports = sequelize.define("todo", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  todoText: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 1
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})
