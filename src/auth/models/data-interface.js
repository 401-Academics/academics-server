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
}

module.exports = DataInterface;
