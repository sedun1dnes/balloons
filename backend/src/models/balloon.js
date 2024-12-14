// src/models/balloon.js
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');


const Balloon = sequelize.define('Balloon', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // Добавление полей createdAt и updatedAt
});


module.exports = Balloon;
