const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),

  lastName: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  studentId: Joi.string().alphanum().min(9).max(9).required(),

  userType: Joi.string()
    .valid("student", "ta", "prof", "sysop", "admin")
    .required(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  registeredCourses: Joi.array().items(Joi.string()).required(),
}).required();

module.exports = schema;
