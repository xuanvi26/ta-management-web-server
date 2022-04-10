const Joi = require("joi");

const schema = Joi.object({
  course_name: Joi.string().min(3).max(30).required(),
}).required();

module.exports = schema;
