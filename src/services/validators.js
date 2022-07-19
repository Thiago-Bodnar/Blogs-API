const ValidationError = require('../errors/ValidationError');

const runPostSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new ValidationError('Some required fields are missing');
  }
  return value;
};

const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = error.details[0].message;
    throw error;
  }
  return value;
};

module.exports = { runPostSchema, runSchema };