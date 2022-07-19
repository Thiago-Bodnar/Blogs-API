const ValidationError = require('../errors/ValidationError');

const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new ValidationError('Some required fields are missing');
  }
  return value;
};

module.exports = { runSchema };