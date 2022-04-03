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

router.get("/", (req, res) => {
  res.render("pages/landing/home");
});

router.get("/login", (req, res) => {
  if (req.session.authenticated) {
    res.render("pages/landing/dashboard", {
      userTypes: req.session.user.userTypes,
    });
  } else {
    res.render("pages/landing/login");
  }
});

router.post("/login", async (req, res) => {
  if (req.session.authenticated) {
    res.render("pages/landing/dashboard", {
      userTypes: req.session.user.userTypes,
    });
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
  let authenticatedUser = await checkLoginCredentials(username, password);
  if (authenticatedUser) {
    req.session.authenticated = true;
    req.session.user = { userTypes: authenticatedUser.userTypes };
    res.render("pages/landing/dashboard", {
      userTypes: req.session.user.userTypes,
    });
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
        res.render("pages/landing/home");
        // res.json({ errors: [], response: response_type.OK });
      }
    });
  })
);

module.exports = router;
