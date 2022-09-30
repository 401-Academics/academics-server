'use strict';

const usersModel = require('./users');
const studentsModel = require('./students/model');
const teachersModel = require('./teachers/model');
const { Sequelize, DataTypes } = require('sequelize');
const DataInterface = require('./data-interface');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory' :
  process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

const students = studentsModel(sequelize, DataTypes);
const teachers = teachersModel(sequelize, DataTypes);

module.exports = {
  database: sequelize,
  users: usersModel(sequelize, DataTypes),
  students: new DataInterface(students),
  teachers: new DataInterface(teachers),
};
