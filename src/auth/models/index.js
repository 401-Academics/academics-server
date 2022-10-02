'use strict';

const usersModel = require('./users');
const studentsModel = require('./students/model');
const teachersModel = require('./teachers/model');
const { Sequelize, DataTypes } = require('sequelize');
const DataInterface = require('./data-interface');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL);

const students = studentsModel(sequelize, DataTypes);
const teachers = teachersModel(sequelize, DataTypes);

// teachers.hasMany(students);
// students.belongsTo(teachers);

module.exports = {
  db: sequelize,
  users: usersModel(sequelize, DataTypes),
  students: new DataInterface(students),
  teachers: new DataInterface(teachers),
};
