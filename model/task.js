const { DataTypes } = require('sequelize')

const database = require('../database')

const Task = database.define('task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATEONLY
  },
  priority: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    get() {
      const rawValue = this.getDataValue('tags');
      return typeof rawValue === 'string' ? rawValue.split(',') : rawValue
    }
  }
})

module.exports = Task
