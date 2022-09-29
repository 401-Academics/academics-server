'use strict';

const studentsModel = (sequelize, DataTypes) => sequelize.define('students', {
  name: {type: DataTypes.STRING, required: true },
  grade: {type: DataTypes.INTEGER, required: true },
  guardian: {type: DataTypes.STRING }, required: true,
  phone: {type: DataTypes.INTEGER },
  address: {type: DataTypes.STRING, required: true},

});

module.exports = studentsModel;
