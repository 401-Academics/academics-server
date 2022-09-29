'use strict';

const studentsModel = require('./students/model');
const teachersModel = require('./teachers/model');
const { Sequelize, DataType } = require('sequelize');
const DataInterface = require('./data-interface.js');

const DATABASE_URL = process.env.NODE_ENV === 'test'
	? 'sqlite::memory' :
	process.env.DATABASE_URL

const sequelize = new Sequelize(DATABASE_URL);

const students = studentsModel(sequelize, DataTypes);
const teachers = teachersModel(sequelize, DataTypes);

module.exports = {
	db: sequelize,
	students: new DataInterface(students),
	teachers: new DataInterface(teachers),
};
