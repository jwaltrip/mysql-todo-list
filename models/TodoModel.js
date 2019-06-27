const sequelize = require("sequelize")

module.exports = sequelize.define("todo", {
  id: {
    type: sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  todoText: {
    type: sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
  isActive: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 1
  },
  dateModified: {
    type: sequelize.DATE
  },
  dateCreated: {
    type: sequelize.DATE
  }
})
