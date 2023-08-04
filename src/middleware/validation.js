const Joi = require("joi");

const validation = (schema) => async (req, res, next) => {
  const validationErr = [];
  ["body", "params", "query","cookies"].forEach((key) => {
    if (schema[key]) {
      const validations = schema[key].validate(req[key]);
      if (validations.error) {
        validationErr.push(validations.error);
      }
    }
  });
  if (validationErr.length > 0) {
    next(
      new Error(
        `validation error ${validationErr[0].details[0].message}`,
        422
      )
    );
  } else {
    next();
  }
};



module.exports = {
  validation,
};
