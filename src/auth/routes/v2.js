'use strict';

const express = require('express');
const dataModule = require('../models/index');
const { students, teachers } = require('../models/index');
const bearerAuthorization = require('../middleware/authbearer');
const userPermissions = require('../middleware/acl');

const router = express.Router();

router.get('/teacherRoster/:id', bearerAuthorization, async (req, res, next) => {
  let { id } = req.params;

  let teacherRoster = await teachers.readManyToOne(id, students.model);

  console.log(teacherRoster.students);
  res.status(200).send(teacherRoster);
});

router.param('model', (req, res, next) => {
  const modelName = req.params.model;

  if (dataModule[modelName]) {
    req.model = dataModule[modelName];
    next();
  } else {
    next('Invalid Data Model');
  }
});

router.get('/:model', bearerAuthorization, handleGetAll);
router.get('/:model/:id', bearerAuthorization, handleGetOne);
router.post('/:model', bearerAuthorization, userPermissions('create'), handleCreate);
router.put('/:model/:id', bearerAuthorization, userPermissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuthorization, userPermissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}
module.exports = router;
