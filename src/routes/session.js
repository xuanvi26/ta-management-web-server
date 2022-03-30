const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { checkLoginCredentials } = require.main.require(
  "./src/services/session"
);
const { checkAuthentication } = require.main.require(
  "./src/utils/authentication"
);
const { response_type } = require.main.require("./src/response");

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

router.post("/login", async (req, res) => {
  if (req.session.authenticated) {
    res.json({ errors: [], response: response_type.OK });
    return;
  }

  let { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      response: response_type.BAD_REQUEST,
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }

  const { username, password } = value;
  if (await checkLoginCredentials(username, password)) {
    req.session.authenticated = true;
    res.json({ errors: [], response: response_type.OK });
  } else {
    res.status(401).json({
      response: response_type.AUTH,
      errors: ["Failed login"],
    });
  }
});

router.post(
  "/logout",
  checkAuthentication((req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.json({ errors: [err.message], response: response_type.AUTH });
      } else {
        res.json({ errors: [], response: response_type.OK });
      }
    });
  })
);

module.exports = router;
