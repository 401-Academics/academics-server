'use strict';

class DataInterface {

  constructor(model){
    this.model = model;
  }

  get(id) {

    if(id) {
      return this.model.findOne({where: {id}});

    } else {
      return this.model.findAll({});
    }

  }

  create(entry) {
    return this.model.create(entry);
  }

  update(id, data) {
    return this.model.findOne({ where: { id }})
      .then(entry => entry.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id }});
  }

  async readManyToOne(id, model){
    try {
      let record = await this.model.findOne({where: {id}, include: model});
      return record;
    } catch (err) {
      console.error('Cannot locate teacher\'s record of students');
      return err;
    }
  }
}

module.exports = DataInterface;
