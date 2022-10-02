'use strict';

const teachersModel = (sequelize, DataTypes) => sequelize.define('teachers', {
  name: {type: DataTypes.STRING, required: true },
  phone: {type: DataTypes.INTEGER, required: true},
  address: {type: DataTypes.STRING, required: true },
  curriculum: {type: DataTypes.ENUM('Math', 'English', 'Science', 'Homeroom', 'History', 'Phys-Ed'), required: true },
});

module.exports = teachersModel;
