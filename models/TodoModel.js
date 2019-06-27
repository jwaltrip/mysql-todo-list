const Sequelize = require("sequelize")

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
