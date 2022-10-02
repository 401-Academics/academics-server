'use strict';

module.exports = function(err, req, res, next) {
  const error = err.message ? err.message : err;

  const errorObject = {
    status: 404,
    message: error,
  };
  res.status(404).json(errorObject);
};
