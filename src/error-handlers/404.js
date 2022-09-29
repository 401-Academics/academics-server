'use strict';

module.exports = function(req, res, next) {
  const errorObject = {
    status: 404,
    message: 'Sorry, Not Found',
  };
  res.status(404).json(errorObject);
};
